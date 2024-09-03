import { HandleBase } from '..';
import { valid_cNodeTree_hash_format } from '@/engine/lib/validate';
import { join } from 'node:path';
import { dir_landing_project } from '@/server/config';
import { createWriteStream, existsSync, statSync } from 'node:fs';
import fs from 'node:fs';
const { readFile, writeFile } = fs.promises;
import { Complier } from '@/engine/Complier';
import { complie_tsx, create_manifest } from './landingCode_gen.lib';
import { httpUrl_landingCode_gen } from '../../http.url';
import type { I_resApiBody, T_errMsgOrData, I_res_landingCode_gen, I_req_landingCode_gen } from './index.type';

export class HandleApi extends HandleBase {
    constructor() {
        super();
    }

    async routerUrl(url: URL) {
        const { res } = this;

        switch (url.pathname) {
            case httpUrl_landingCode_gen:
                await this.landingCode_gen();
                break;
            default:
                res.statusCode = 404;
                res.setHeader('Content-Type', `text/plain;charset=utf-8`);
                res.end('没有该接口');
        }

        return res
    }

    fetchResApiWrap<T_data = any>(resApiInfo?: T_errMsgOrData<T_data>): void {
        const { res } = this;
        const resBody: I_resApiBody<T_data> = {
            success: true,
            data: null,
            errMsg: '',
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');

        if (!resApiInfo) {
            res.end(JSON.stringify(resBody));
            return
        }

        if ('data' in resApiInfo) {
            resBody.data = resApiInfo.data;
        } else {
            res.statusCode = 500;
            resBody.success = false;
            resBody.errMsg = resApiInfo.errMsg || '服务器错误';
        }

        res.end(JSON.stringify(resBody));
        return
    }


    // async landingCode_gen(): Promise<void> {
    //     return new Promise<void>((re, rj) => {
    //         setTimeout(() => {
    //             re();
    //             // rj();
    //         }, 5 * 1000);
    //     })
    //         .then(_ => {
    //             this.fetchResApiWrap({ data: +new Date() });
    //         })
    //         .catch(err => {
    //             this.fetchResApiWrap({ errMsg: '出错' });
    //         })
    // } // todo

    async landingCode_gen(): Promise<void> {
        const { req } = this;
        const errMsg = '生成代码文件出错';
        // todo 可以建立一个pool，pool[id]为hash，若正在生成，则不做处理 
        return new Promise<I_req_landingCode_gen>((re, rj) => {
            let jsonStr = ''
            req
                .on('error', err => { rj(err) })
                .on('data', data => {
                    jsonStr += data;
                })
                .on('end', () => {
                    re(JSON.parse(jsonStr));
                })
        })
            .then(async ({ cNodeTree_JSON, cNodeTree_hash, region = {} }) => {
                // const controller = new AbortController();
                // const { signal } = controller;
                try {
                    if (!valid_cNodeTree_hash_format(cNodeTree_hash)) {
                        this.fetchResApiWrap({ errMsg: 'cNodeTree_hash校验不通过' });
                    };

                    const
                        fileName_manifest = cNodeTree_hash + '.manifest.json',
                        filePath_manifest = join(dir_landing_project, fileName_manifest),
                        fileName_tsx = cNodeTree_hash + '.tsx',
                        filePath_tsx = join(dir_landing_project, fileName_tsx);

                    // 1、若存在manifest，直接返回
                    if (existsSync(filePath_manifest)) {
                        const { manifest } = JSON.parse(await readFile(filePath_manifest, { encoding: 'utf-8' }));
                        const { birthtimeMs } = statSync(filePath_manifest);
                        this.fetchResApiWrap<I_res_landingCode_gen>({ data: { birthtimeMs, downloadUrl_manifest: manifest as string } });
                        return
                    }

                    // 2、根据json编译出tsx文件
                    const complier = new Complier();
                    complier.set_cNodeTree_JSON(cNodeTree_JSON);
                    complier.gen_form_edit();
                    region.RegionHeader && complier.gen_header();
                    region.RegionSideMenuBar && complier.gen_sideMenuBar();
                    const tsx = complier.getResult();
                    complier.reset();
                    const data = new Uint8Array(Buffer.from(tsx));
                    await writeFile(filePath_tsx, data);

                    // 3、编译tsx，生成html、js、css
                    const assetsFromWebpack = await complie_tsx(filePath_tsx, cNodeTree_hash);

                    // 4、拿到资产，生成manifest
                    // 要在此处生成manifest而不是webpack afterEmit中，因为后者即使报错也会生成中间产物
                    const downloadUrl_manifest = await create_manifest(filePath_manifest, fileName_manifest, fileName_tsx, assetsFromWebpack);
                    const { birthtimeMs } = statSync(filePath_manifest);
                    this.fetchResApiWrap<I_res_landingCode_gen>({ data: { birthtimeMs, downloadUrl_manifest } });
                } catch (err) {
                    throw err;
                }
            })
            .catch(err => {
                this.fetchResApiWrap({ errMsg });
                console.error('landingCode_gen出错 -> ' + err);
            })
    }
}