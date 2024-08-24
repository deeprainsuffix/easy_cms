import { readdir, stat, rm } from 'fs';
import { join } from 'path';
import { cNodeTree_json_clearTimeMs, landing_project_clearTimeMs } from '../http.const';
import { dir_cNodeTree_json, dir_landing_project } from '../config';

function clear(dir: string, saveTime: number, errMsg: string) {
    readdir(dir, (err, files) => {
        if (err) {
            console.error(errMsg + '扫描文件夹出错 -> ' + err);
            return
        }

        const currTimeMs = +new Date();
        files.forEach(file => {
            const filePath = join(dir, file);
            stat(filePath, (err, stats) => {
                if (err) {
                    console.error(errMsg + '扫描文件夹出错 -> ' + err);
                    return
                }

                const { birthtimeMs } = stats;
                if (currTimeMs - birthtimeMs > saveTime) {
                    rm(filePath, err => {
                        if (err) {
                            console.error(errMsg + '删除文件出错 -> ' + err);
                            return
                        }
                    });
                }
            });
        });
    });
}

// console.log('定时任务启动: 清理cNodeTree_json');
// setInterval(() => {
//     clear(dir_cNodeTree_json, cNodeTree_json_clearTimeMs, '清理cNodeTree_json出错 -> ');
// }, cNodeTree_json_clearTimeMs);

// console.log('定时任务启动: 清理landing_project');
// setInterval(() => {
// clear(dir_landing_project, landing_project_clearTimeMs, '清理landing_project出错 -> ');
// }, landing_project_clearTimeMs);