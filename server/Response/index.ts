import http from 'http';
import { ext2MIME, isValidedExt, type T_ext } from './index.const';
import { readFile } from 'node:fs/promises';
import { createReadStream, existsSync } from 'fs';
import { extname } from 'path';

type T_requestListener = NonNullable<Parameters<typeof http.createServer>[1]>;
export type T_http_req = Parameters<T_requestListener>[0];
export type T_http_res = Parameters<T_requestListener>[1];

interface I_HandleBase {
    req: T_http_req;
    res: T_http_res;
};

export abstract class HandleBase implements I_HandleBase {
    req: I_HandleBase['req'];
    res: I_HandleBase['res'];

    constructor() {
        this.req = {} as I_HandleBase['req'];
        this.res = {} as I_HandleBase['res'];
    }

    public async router(req: I_HandleBase['req'], res: I_HandleBase['res']) {
        this.req = req;
        this.res = res;
        const url = new URL(req.url || '', process.env.HOST);
        // console.log('收到请求', req.url);
        return await this.routerUrl(url)
    }

    abstract routerUrl(url: URL): Promise<I_HandleBase['res']>;

    protected async get_plain(filePath: string, ext: string | undefined) {
        if (!this.check(filePath, ext)) {
            return
        }

        const { res } = this, encoding = 'utf-8';
        const file = await readFile(filePath, { encoding });
        const MIME = ext2MIME[ext];

        res.statusCode = 200;
        res.setHeader('Content-Type', `${MIME};charset=${encoding}`);
        res.end(file);
    }

    protected async get_stream(filePath: string, ext: string | undefined) {
        if (!this.check(filePath, ext)) {
            return
        }

        const { res } = this, encoding = 'utf-8';
        const MIME = ext2MIME[ext];
        return new Promise<void>((re, rj) => {
            res.statusCode = 206;
            res.setHeader('Content-Type', `${MIME};charset=${encoding}`);
            const readStream = createReadStream(filePath);
            readStream
                .on('error', err => rj(err))
                .on('end', () => re())
                .pipe(res)
        })
            .then(_ => {
                res.end();
            })
            .catch(err => {
                res.statusCode = 500;
                res.end('获取文件失败');
                console.log('get_stream出错 -> ', err);
            });
    }

    protected get_ext(pathname: string) {
        return extname(pathname)
    }

    private check(fileName: string, ext: string | undefined): ext is T_ext {
        if (this.check_exist(fileName) && this.check_ext(ext)) {
            return true
        }

        return false
    }

    private check_exist(filePath: string) {
        const { res } = this;
        if (!existsSync(filePath)) {
            res.statusCode = 404;
            res.setHeader('Content-Type', `text/plain;charset=utf-8`);
            res.end('文件不存在');
            return false;
        }

        return true
    }

    private check_ext(ext: string | null | undefined) {
        const { res } = this;
        if (ext === null || ext === undefined || !Object.hasOwn(ext2MIME, ext)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', `text/plain;charset=utf-8`);
            res.end('没有此类文件后缀: ' + ext);
            return false
        }

        return true
    }
}