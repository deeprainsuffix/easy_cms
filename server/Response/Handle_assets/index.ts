import { HandleBase } from '..';
import { join } from 'path';
import { dir_server } from '@/server/config';


export class Handle_assets extends HandleBase {
    constructor() {
        super();
    }

    async routerUrl(url: URL): Promise<void> {
        const ext = this.get_ext(url.pathname),
            filePath = join(dir_server, url.pathname);

        return await this.get_plain(filePath, ext)
    }
}