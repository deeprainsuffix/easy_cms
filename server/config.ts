import { resolve, join } from 'node:path';

export const
    dir_root = resolve(__dirname, '..'),
    dir_server = resolve(__dirname),

    landing_project = 'landing_project',
    dir_landing_project = join(dir_server, landing_project),

    dir_static = resolve(__dirname, '../dist_client');