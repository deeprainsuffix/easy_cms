import http from 'http';
import { HandleApi } from './Response/HandleApi';
import { httpUrl_prefix_api, httpUrl_prefix_assets } from './http.url';
import { Handle_assets } from './Response/Handle_assets';
import { Handle_static } from './Response/Handle_static';

const server = http.createServer(async (req, res) => {
    try {
        req.url = req.url || '';
        if (req.url.startsWith(httpUrl_prefix_api)) {
            return await new HandleApi().router(req, res);
        } else if (req.url.startsWith(httpUrl_prefix_assets)) {
            return await new Handle_assets().router(req, res);
        } else {
            return await new Handle_static().router(req, res);
        }

    } catch (err) {
        console.log('createServer中兜底::', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', `text/plain;charset=utf-8`);
        !res.writableEnded && res.end('服务器错误');
    }
});

const port = 3000;
server.listen(port, () => {
    process.env.HOST = process.env.NODE_ENV === 'prod' ? 'https://easy-cms.pages.dev' : 'http://localhost:3000';
    console.log(`启动 正在监听${port}端口`);
})