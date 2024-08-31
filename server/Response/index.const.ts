export const
    ext_html = '.html',
    ext_js = '.js',
    ext_css = '.css',
    ext_tsx = '.tsx',
    ext_json = '.json';

export type T_ext =
    typeof ext_html |
    typeof ext_js |
    typeof ext_css |
    typeof ext_tsx |
    typeof ext_json
    ;

export const ext2MIME = {
    [ext_html]: 'text/html',
    [ext_js]: 'text/javascript',
    [ext_css]: 'text/css',
    [ext_tsx]: 'text/plain',
    [ext_json]: 'application/json',
} as const;

export function isValidedExt(ext: string | null | undefined): ext is T_ext {
    if (ext === null || ext === undefined) return false;

    if (ext in ext2MIME) {
        return true
    } else {
        return false
    }
}