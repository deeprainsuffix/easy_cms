import { dir_landing_project } from '@/server/config';
import { exec as exec_ori } from 'child_process';
import { promisify } from 'node:util';
import { join } from 'path';
import { writeFile } from 'node:fs/promises';

export async function complie_tsx(filePath_entry: string, cNodeTree_hash: string): Promise<string[]> {
    // 应该需要改变执行路径
    const exec = promisify(exec_ori);
    try {
        const { stdout, stderr } = await exec(
            `webpack --entry ${filePath_entry} --config webpack.config.project.js --env cNodeTree_hash=${cNodeTree_hash}`,
        );

        if (stderr) {
            throw stderr;
        }

        return stdout.trimEnd().split(' ');
    } catch (err) {
        throw 'complie_tsx出错 -> ' + err;
    }
}

// todo 这里后边要改，资产中还有公共包
const ASSES_HTML = 'html', ASSES_JS = 'js', ASSES_CSS = 'css';
interface I_pack {
    manifest: string;
    entry: string;
    [ASSES_HTML]: string | null;
    [ASSES_JS]: string | null;
    [ASSES_CSS]: string | null;
}

export async function create_manifest(manifest: string, entry: string, assets: string[]) {
    try {
        const pack: I_pack = {
            manifest,
            entry,
            [ASSES_HTML]: null,
            [ASSES_JS]: null,
            [ASSES_CSS]: null,
        };

        for (const file of assets) {
            const ext = file.split('.')[1];
            const filePath_asset = join(dir_landing_project, file);
            switch (ext) {
                case ASSES_HTML: pack[ASSES_HTML] = filePath_asset; break;
                case ASSES_JS: pack[ASSES_JS] = filePath_asset; break;
                case ASSES_CSS: pack[ASSES_CSS] = filePath_asset; break;
            }
        }

        const assets_lack = ([ASSES_HTML, ASSES_JS, ASSES_CSS] as const).filter(e => pack[e] === null);
        if (assets_lack.length) {
            throw '缺少的资产' + assets_lack.join('、');
        }

        await writeFile(manifest, JSON.stringify(pack));
    } catch (err) {
        throw 'create_manifest出错 -> ' + err;
    }
}