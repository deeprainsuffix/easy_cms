import { resolve, join } from 'path';

export const
    dir_root = resolve(__dirname, '..'),
    dir_root_server = resolve(__dirname),
    cNodeTree_jsonFiles = 'cNodeTree_jsonFiles',
    dir_cNodeTree_json = join(dir_root_server, cNodeTree_jsonFiles),
    landing_project = 'landing_project',
    dir_landing_project = join(dir_root_server, landing_project);