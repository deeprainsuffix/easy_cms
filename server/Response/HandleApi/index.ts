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












    // export async function cNodeTree_JSON_save_res(req: T_http_req, res: T_http_res): Promise<void> {
    //     const errMsg = '保存cNodeTree_json出错';
    //     try {
    //         const myURL = new URL(req.url!, process.env.HOST);
    //         const cNodeTree_hash = myURL.searchParams.get(cNodeTree_hash_param);
    //         if (!valid_cNodeTree_hash_format(cNodeTree_hash)) {
    //             fetchResApiWrap(res, { errMsg: 'cNodeTree_hash校验不通过' });
    //         };

    //         if (!cNodeTree_hash) {
    //             return fetchResApiWrap(res, {
    //                 errMsg: `查询参数中缺少${cNodeTree_hash_param}`,
    //             });
    //         }

    //         const fileName = join(dir_cNodeTree_json, `${cNodeTree_json_fileName_prefix}.${cNodeTree_hash}.json`);
    //         if (existsSync(fileName)) {
    //             const { birthtimeMs } = statSync(fileName);
    //             return fetchResApiWrap(res, {
    //                 data: birthtimeMs,
    //             });
    //         }

    //         return new Promise<void>((re, rj) => {
    //             const fileWriteStream = createWriteStream(fileName);
    //             fileWriteStream
    //                 .on('error', err => {
    //                     rj(err);
    //                 })
    //                 .on('finish', () => {
    //                     re();
    //                 });
    //             req.pipe(fileWriteStream);
    //         })
    //             .then(_ => {
    //                 const { birthtimeMs } = statSync(fileName);
    //                 fetchResApiWrap(res, {
    //                     data: birthtimeMs,
    //                 });
    //             })
    //             .catch(err => {
    //                 fetchResApiWrap(res, { errMsg });
    //                 console.error('写入json文件出错 -> ' + err);
    //             })
    //     } catch (err) {
    //         fetchResApiWrap(res, { errMsg });
    //         console.error('cNode_JSON_save_res出错 -> ' + err);
    //     }
    // }

    // export async function cNodeTree_JSON_get_res(req: T_http_req, res: T_http_res): Promise<void> {
    //     const errMsg = '获取cNodeTree_json出错';
    //     try {
    //         const jsonFileName = req.url!.split(httpUrl_cNodeTree_JSON_get_prefix).pop();
    //         if (!jsonFileName) {
    //             fetchResApiWrap(res, { errMsg: '缺少json文件名' });
    //             return
    //         }

    //         const filePath = join(dir_cNodeTree_json, jsonFileName)
    //         if (!existsSync(filePath)) {
    //             fetchResApiWrap(res, { errMsg: '没有该文件' });
    //             return
    //         }

    //         const json = await readFile(filePath, { encoding: 'utf8' });
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type', 'application/json;charset=utf-8');
    //         res.end(json);
    //     } catch (err) {
    //         fetchResApiWrap(res, { errMsg });
    //         console.error('cNodeTree_JSON_get_res出错 -> ' + err);
    //     }
    // }
}