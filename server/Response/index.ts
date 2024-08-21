import type { T_http_req, T_http_res } from './HandleApi/type';

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
        console.log('收到请求', req.url);
        return await this.routerUrl(url)
    }

    abstract routerUrl(url: URL): Promise<void>;
}