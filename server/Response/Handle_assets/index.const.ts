// todo 这里后边要改，资产中还有公共包
export const
    ASSES_HTML = 'html',
    ASSES_JS = 'js',
    ASSES_CSS = 'css';
export const essentialAssets = [
    ASSES_HTML, ASSES_JS, ASSES_CSS
] as const;

export interface I_AssetsFromWebpack {
    [ASSES_HTML]: string;
    [ASSES_JS]: string;
    [ASSES_CSS]: string;
};

export interface I_Assets extends I_AssetsFromWebpack {
    manifest: string;
    entry: string;
}