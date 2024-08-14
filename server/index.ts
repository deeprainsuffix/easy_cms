import http from 'http';

type T_requestListener = NonNullable<Parameters<typeof http.createServer>[1]>;
export type T_http_req = Parameters<T_requestListener>[0];
export type T_http_res = Parameters<T_requestListener>[1];

import { httpUrl_cNodeTree_JSON_get_prefix, httpUrl_cNodeTree_JSON_save } from './Response/http_url';
import { cNodeTree_JSON_save_res, cNodeTree_JSON_get_res } from './Response/index';

const server = http.createServer(async (req, res) => {
    console.log('收到请求', req.url);
    try {
        req.url = req.url || '';
        if (req.url.startsWith(httpUrl_cNodeTree_JSON_save)) {
            return await cNodeTree_JSON_save_res(req, res);
        }

        if (req.url.startsWith(httpUrl_cNodeTree_JSON_get_prefix)) {
            return await cNodeTree_JSON_get_res(req, res);
        }

        res.statusCode = 404;
        res.end('404');
    } catch (err) {
        console.log('createServer中兜底::', err);
        res.statusCode = 500;
        !res.writableEnded && res.end('服务器错误');
    }
});

const port = 3000;
server.listen(port, () => {
    process.env.HOST = 'http://localhost:3000'; // todo
    console.log(`启动 正在监听${port}端口`);
})