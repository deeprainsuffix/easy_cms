import { HandleBase } from '..'; import { readFile } from 'node:fs/promises';
import { ext2MIME, isValidedExt, type T_ext } from './HandleFile.const';
import { existsSync } from 'fs';

export class HandleFile extends HandleBase {
    constructor() {
        super();
    }

    async routerUrl(url: URL): Promise<void> {
        const { res } = this, filePath = url.pathname;

        if (!existsSync(filePath)) {
            res.statusCode = 404;
            res.end('文件不存在');
            return
        }

        const ext = filePath.split('.').pop();
        if (!isValidedExt(ext)) {
            res.statusCode = 400;
            res.end('没有此类文件后缀: ' + ext);
            return
        }

        return await this.getFile_utf8(filePath, ext);
    }

    private async getFile_utf8(filePath: string, ext: T_ext) {
        const { res } = this, encoding = 'utf-8';
        const file = await readFile(filePath, { encoding });
        const MIME = ext2MIME[ext];

        res.statusCode = 200;
        res.setHeader('Content-Type', `${MIME};charset=${encoding}`);
        res.end(file);
    }
}

export const handleFile = new HandleFile();