import { connector } from ".";
import dayjs from 'dayjs';
import { landing_project_clearTimeMs } from "@/server/http.const";
import type { I_CNode_JSON } from "../CNodeTree/CNode/type";
import { cNodeTree } from "../CNodeTree";
import JSZip from 'JSZip';

export const UNDO = 'UNDO',
    DOING = 'DOING',
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL';
type T_state = typeof UNDO | typeof DOING | typeof SUCCESS | typeof FAIL;

const state_content = {
    [UNDO]: 'no content',
    [DOING]: '正在生成代码文件资源...',
    [SUCCESS]: (birthtimeMs: number) => `资源截止到${dayjs(birthtimeMs + landing_project_clearTimeMs).format('YYYY-MM-DD HH:mm:ss')}失效，请及时下载`,
    [FAIL]: '请咨询管理员',
} as const,
    state_tip_text = {
        [UNDO]: null,
        [DOING]: '生成中，请稍后',
        [SUCCESS]: '点击查看',
        [FAIL]: '出错啦',
    } as const;

interface I_Btn_codeGen {
    render: any;

    state: T_state;
    cNodeTree_JSON: I_CNode_JSON | null;
    cNodeTree_hash: string | null;

    Dialog_show: boolean; // 弹窗展示
    content: string | null; // 弹窗content，之所以设为状态是因为有消失过渡
    tip_Icon_show: boolean; // tip_Icon展示
    tip_Icon_active: boolean; // tip_Icon的动画
    tip_text_show: boolean; // tip_text展示
    tip_text: string | null; // tip_text文案，之所以设为状态是因为有消失过渡
    firstOpen: boolean;
    tip_text_loading_first: ReturnType<typeof setTimeout> | null; // 第一次关闭时，若为加载中，提示一下
}

export class Btn_codeGen implements I_Btn_codeGen {
    render: I_Btn_codeGen['render'];

    state: I_Btn_codeGen['state'];
    cNodeTree_JSON: I_Btn_codeGen['cNodeTree_JSON'];
    cNodeTree_hash: I_Btn_codeGen['cNodeTree_hash'];

    Dialog_show: I_Btn_codeGen['Dialog_show'];
    content: I_Btn_codeGen['content'];
    tip_Icon_show: I_Btn_codeGen['tip_Icon_show'];
    tip_Icon_active: I_Btn_codeGen['tip_Icon_active'];
    tip_text_show: I_Btn_codeGen['tip_text_show'];
    tip_text: I_Btn_codeGen['tip_text'];
    firstOpen: I_Btn_codeGen['firstOpen'];
    tip_text_loading_first: I_Btn_codeGen['tip_text_loading_first'];

    constructor() {
        this.state = UNDO;
        this.cNodeTree_JSON = null;
        this.cNodeTree_hash = null;

        this.Dialog_show = false;
        this.content = state_content[this.state];
        this.tip_Icon_show = false;
        this.tip_Icon_active = false;
        this.tip_text_show = false;
        this.tip_text = state_tip_text[this.state];
        this.firstOpen = false;
        this.tip_text_loading_first = null;
    }

    private codeGen_after(birthtimeMs: Awaited<ReturnType<typeof connector.codeGen>>) {
        if (!birthtimeMs) {
            this.state = FAIL;
            this.content = state_content[this.state];
        } else {
            this.state = SUCCESS;
            this.content = state_content[this.state](birthtimeMs);
        }
        this.tip_text = state_tip_text[this.state];

        if (this.Dialog_show) {
            this.tip_Icon_active = false;
            this.tip_text_show = false;
        } else {
            this.tip_Icon_active = true;
            this.tip_text_show = true;
        }
        if (this.tip_text_loading_first !== null) {
            clearTimeout(this.tip_text_loading_first);
            this.tip_text_loading_first = null;
        }

        this.render();
    }

    public async codeGen() {
        this.state = DOING;
        const { cNodeTree_JSON, cNodeTree_hash } = await cNodeTree.getCNodeTreeJSON();
        this.cNodeTree_JSON = cNodeTree_JSON;
        this.cNodeTree_hash = cNodeTree_hash;

        this.firstOpen = true;
        this.Dialog_show = true;
        this.content = state_content[this.state];
        this.tip_Icon_show = true;
        this.tip_text_show = false;
        this.render();

        const birthtimeMs = await connector.codeGen(this.cNodeTree_JSON, this.cNodeTree_hash);
        this.codeGen_after(birthtimeMs);
    }

    public async codeGenAgain() {
        this.state = DOING;
        this.content = state_content[this.state];
        this.render();
        const birthtimeMs = await connector.codeGen(this.cNodeTree_JSON!, this.cNodeTree_hash!);
        this.codeGen_after(birthtimeMs);
    }

    public close() {
        this.Dialog_show = false;
        if (this.firstOpen) {
            this.firstOpen = false;
            if (this.state === DOING) {
                this.tip_text_show = true;
                this.tip_text = state_tip_text[this.state];
                this.tip_text_loading_first = setTimeout(() => {
                    if (this.tip_text_loading_first === null) {
                        return
                    }

                    this.tip_text_show = false;
                    this.render();
                }, 3 * 1000);
            }
        }
        this.render();
    }

    public getAssets() {
        if (this.state === UNDO) {
            return
        }

        this.Dialog_show = true;
        if (this.state === SUCCESS || this.state === FAIL) {
            if (this.tip_Icon_active) {
                this.tip_Icon_active = false;
            }
            if (this.tip_text_show) {
                this.tip_text_show = false;
            }
        }

        this.render();
    }

    public async downloadAssets() {
        const zip = new JSZip();

        zip.file("Hello.txt", "Hello World\n");
        zip.file("Hello2.txt", "Hello2 World\n");

        // const img = zip.folder("images");
        // img!.file("smile.gif", '1', { base64: true });

        zip.generateAsync({ type: "blob" }).then(function (content) {
            // see FileSaver.js
            // saveAs(content, "example.zip");
            console.log('content', content);
        });
    }
}

export const btn_codeGen = new Btn_codeGen();

