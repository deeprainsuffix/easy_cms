import { HandleBase } from '..';
import { join } from 'node:path';
import { dir_server } from '@/server/config';


export class Handle_assets extends HandleBase {
    constructor() {
        super();
    }

    async routerUrl(url: URL) {
        const { res } = this;
        const ext = this.get_ext(url.pathname),
            filePath = join(dir_server, url.pathname);

        await this.get_plain(filePath, ext);

        return res
    }
}