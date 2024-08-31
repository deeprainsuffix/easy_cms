import { HandleBase } from '..';
import { join } from 'path';
import { dir_static } from '@/server/config';


export class Handle_static extends HandleBase {
    constructor() {
        super();
    }

    async routerUrl(url: URL): Promise<void> {
        let ext = this.get_ext(url.pathname),
            filePath = join(dir_static, url.pathname);
        if (!ext) {
            ext = '.html';
            filePath = join(dir_static, 'index.html');
        }

        return await this.get_plain(filePath, ext)
    }
}