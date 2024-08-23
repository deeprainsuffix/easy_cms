import { HandleBase } from '..';
import { join } from 'path';
import { dir_root_server } from '@/server/config';


export class Handle_assets extends HandleBase {
    constructor() {
        super();
    }

    async routerUrl(url: URL): Promise<void> {
        const filePath = join(dir_root_server, url.pathname);
        const ext = filePath.split('.').pop();

        return await this.get_plain(filePath, ext)
    }


}

export const handle_assets = new Handle_assets();