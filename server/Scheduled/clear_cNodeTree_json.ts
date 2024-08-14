import { readdir, stat, rm } from 'fs';
import path from 'path';
import { cNodeTree_json_clearTimeMs } from '../Response/http_const';

const errMsg = '清理cNodeTree_json出错 -> ';
const cNodeTree_json_dir = path.resolve(__dirname, '../cNodeTree_jsonFiles');

function clear() {
    readdir(cNodeTree_json_dir, (err, files) => {
        if (err) {
            console.log(errMsg + '扫描文件夹出错 -> ' + err);
            return
        }

        files.forEach(file => {
            const filePath = path.resolve(cNodeTree_json_dir, file);
            stat(filePath, (err, stats) => {
                if (err) {
                    console.log(errMsg + '扫描文件夹出错 -> ' + err);
                }
                const currTimeMs = +new Date(), birthtimeMs = stats.birthtimeMs;
                if (currTimeMs - birthtimeMs > cNodeTree_json_clearTimeMs) {
                    rm(filePath, err => {
                        if (err) {
                            console.log(errMsg + '删除文件出错 -> ' + err);
                        }
                    });
                }
            });
        });
    });
}

console.log('定时任务启动: 清理cNodeTree_json');
setInterval(clear, cNodeTree_json_clearTimeMs / 2);