import { resolve, join } from 'path';

export const dir_root = resolve(__dirname, '..');
export const dir_root_server = resolve(__dirname);
export const dir_cNodeTree_json = join(dir_root_server, 'cNodeTree_jsonFiles');
export const dir_landing_project = join(dir_root_server, 'landing_project');