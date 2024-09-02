import { exec as exec_ori } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(exec_ori);
import fs from 'node:fs';
const { writeFile } = fs.promises;
import { type I_Assets, type I_AssetsFromWebpack, ASSES_CSS, ASSES_HTML, ASSES_JS, essentialAssets } from '../Handle_assets/index.const';
import { extname } from 'node:path';

export async function complie_tsx(filePath_entry: string, cNodeTree_hash: string): Promise<I_AssetsFromWebpack> {
    // 应该需要改变执行路径
    try {
        const { stdout, stderr } = await exec(
            `webpack --entry ${filePath_entry} --config webpack.config.project.js --env cNodeTree_hash=${cNodeTree_hash}`,
        );

        if (stderr) {
            throw stderr;
        }

        // 检查资源完整性
        const assets: I_AssetsFromWebpack = {
            [ASSES_HTML]: '',
            [ASSES_JS]: '',
            [ASSES_CSS]: '',
        };

        if (!stdout) {
            throw 'webpack无输出';
        }
        const stdout_arr = stdout.trimEnd().split(' ');
        if (!stdout_arr.length) {
            throw 'webpack输出资产文件数量为0';
        }

        for (const fileName of stdout_arr) {
            const ext = extname(fileName);
            switch (ext) {
                case ASSES_HTML: assets[ASSES_HTML] = fileName; break;
                case ASSES_JS: assets[ASSES_JS] = fileName; break;
                case ASSES_CSS: assets[ASSES_CSS] = fileName; break;
            }
        }

        const assets_lack = essentialAssets.filter(e => assets[e] === '');
        if (assets_lack.length) {
            throw '缺少的资产' + assets_lack.join('、');
        }

        return assets;
    } catch (err) {
        throw 'complie_tsx出错 -> ' + err;
    }
}

export async function create_manifest(
    filePath_manifest: string,
    fileName_manifest: string, fileName_tsx: string,
    assetsFromWebpack: I_AssetsFromWebpack
): Promise<string> {
    try {
        const assets: I_Assets = {
            manifest: fileName_manifest,
            entry: fileName_tsx,
            ...assetsFromWebpack,
        };

        await writeFile(filePath_manifest, JSON.stringify(assets));
        return assets['manifest']
    } catch (err) {
        throw 'create_manifest出错 -> ' + err;
    }
}