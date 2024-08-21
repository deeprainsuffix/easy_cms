import http from 'http';
import { handleApi } from './Response/HandleApi';
import { handleFile } from './Response/HandleFile';

const server = http.createServer(async (req, res) => {
    try {
        req.url = req.url || '';
        if (req.url.startsWith('/api')) {
            return await handleApi.router(req, res);
        } else {
            return await handleFile.router(req, res);
        }
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