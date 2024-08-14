import type { T_http_res, T_http_req } from '..';
import { createWriteStream, existsSync, statSync } from 'fs';
import { readFile } from 'node:fs/promises';
import path from 'path';
import { cNodeTree_hash_param, cNodeTree_json_fileName_prefix } from './http_const';
import { httpUrl_cNodeTree_JSON_get_prefix } from './http_url';

interface T_resApiInfo_success {
    data: any;
};
interface T_resApiInfo_fail {
    errMsg: string;
};
type T_resApiInfo = T_resApiInfo_success | T_resApiInfo_fail;

export interface T_resApiBody {
    success: boolean;
    data: T_resApiInfo_success['data'];
    errMsg: T_resApiInfo_fail['errMsg'];
};

function fetchResApiWrap(res: T_http_res, resApiInfo?: T_resApiInfo): void {
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

const cNodeTree_jsonDir = path.resolve(__dirname, '../cNodeTree_jsonFiles');
export async function cNodeTree_JSON_save_res(req: T_http_req, res: T_http_res): Promise<void> {
    const errMsg = '保存cNodeTree_json出错';
    try {
        const myURL = new URL(req.url!, process.env.HOST);
        const cNodeTree_hash = myURL.searchParams.get(cNodeTree_hash_param);
        if (!cNodeTree_hash) {
            return fetchResApiWrap(res, {
                errMsg: `查询参数中缺少${cNodeTree_hash_param}`,
            });
        }

        const fileName = path.resolve(cNodeTree_jsonDir, `${cNodeTree_json_fileName_prefix}.${cNodeTree_hash}.json`);
        if (existsSync(fileName)) {
            const { birthtimeMs } = statSync(fileName);
            return fetchResApiWrap(res, {
                data: birthtimeMs,
            });
        }

        return new Promise<void>((re, rj) => {
            const fileWriteStream = createWriteStream(fileName);
            fileWriteStream
                .on('error', err => {
                    rj(err);
                })
                .on('finish', () => {
                    re();
                });
            req.pipe(fileWriteStream);
        })
            .then(_ => {
                const { birthtimeMs } = statSync(fileName);
                fetchResApiWrap(res, {
                    data: birthtimeMs,
                });
            })
            .catch(err => {
                fetchResApiWrap(res, { errMsg });
                console.error('写入json文件出错 -> ' + err);
            })
    } catch (err) {
        fetchResApiWrap(res, { errMsg });
        console.error('cNode_JSON_save_res出错 -> ' + err);
    }
}

export async function cNodeTree_JSON_get_res(req: T_http_req, res: T_http_res): Promise<void> {
    const errMsg = '获取cNodeTree_json出错';
    try {
        const jsonFileName = req.url!.split(httpUrl_cNodeTree_JSON_get_prefix).pop();
        if (!jsonFileName) {
            fetchResApiWrap(res, { errMsg: '缺少json文件名' });
            return
        }

        const filePath = path.resolve(cNodeTree_jsonDir, jsonFileName)
        if (!existsSync(filePath)) {
            fetchResApiWrap(res, { errMsg: '没有该文件' });
            return
        }

        const json = await readFile(filePath, { encoding: 'utf8' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.end(json);
    } catch (err) {
        fetchResApiWrap(res, { errMsg });
        console.error('cNodeTree_JSON_get_res出错 -> ' + err);
    }
}