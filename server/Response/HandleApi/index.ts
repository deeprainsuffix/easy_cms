import { I_CNode_JSON } from '@/engine/CNodeTree/CNode/type';
import { HandleBase } from '..';
import { valid_cNodeTree_hash_format } from '@/engine/lib/validate';
import { join } from 'path';
import { dir_landing_project } from '@/server/config';
import { createWriteStream, existsSync, statSync } from 'fs';
import { codeGen } from '@/engine/CodeGen';
import { writeFile } from 'node:fs/promises';
import { complie_tsx, create_manifest } from './landingCode_gen.lib';
import { httpUrl_landingCode_gen } from '../../http.url';
import type { T_resApiBody, T_resApiInfo } from './type';

export class HandleApi extends HandleBase {
    constructor() {
        super();
    }

    async routerUrl(url: URL): Promise<void> {
        const { res } = this;

        switch (url.pathname) {
            case httpUrl_landingCode_gen:
                return await this.landingCode_gen();
            default:
                res.statusCode = 404;
                res.end('没有该接口');
        }   return
    }

    fetchResApiWrap(resApiInfo?: T_resApiInfo): void {
        const { res } = this;
        const resBody: T_resApiBody = {
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

    // 
    // async landingCode_gen(): Promise<void> {
    //     return new Promise<void>((re, rj) => {
    //         setTimeout(() => {
    //             re();
    //             // rj();
    //         }, 2 * 1000);
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
        // todo 需要建立一个pool，pool[id]为hash，若正在生成，则不做处理 
        return new Promise<{ json: I_CNode_JSON, hash: string }>((re, rj) => {
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
            .then(async ({ json, hash }) => {
                // const controller = new AbortController();
                // const { signal } = controller;
                try {
                    if (!valid_cNodeTree_hash_format(hash)) {
                        this.fetchResApiWrap({ errMsg: 'cNodeTree_hash校验不通过' });
                    };

                    const filePath_manifest = join(dir_landing_project, hash + 'manifest.json'),
                        filePath_tsx = join(dir_landing_project, hash + '.tsx');

                    // 1、若存在manifest，直接返回
                    if (existsSync(filePath_manifest)) {
                        const { birthtimeMs } = statSync(filePath_manifest);
                        this.fetchResApiWrap({ data: birthtimeMs });
                        return
                    }

                    // 2、根据json编译出tsx文件
                    codeGen.set_cNodeTree_JSON(json);
                    codeGen.gen_form_edit();
                    const tsx = codeGen.getResult();
                    const data = new Uint8Array(Buffer.from(tsx));
                    await writeFile(filePath_tsx, data);

                    // 3、编译tsx，生成html、js、css
                    // todo 这里应该建一个进程池，对正在运行的进程数量做控制
                    const assets = await complie_tsx(filePath_tsx, hash);

                    // 4、拿到资产，生成manifest
                    // 要在此处生成manifest而不是webpack afterEmit中，因为后者即使报错也会生成中间产物
                    await create_manifest(filePath_manifest, filePath_tsx, assets);
                    const { birthtimeMs } = statSync(filePath_manifest);
                    this.fetchResApiWrap({ data: birthtimeMs });
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

export const handleApi = new HandleApi();