import { connector } from ".";
import dayjs from 'dayjs';
import { landing_project_clearTimeMs } from "@/server/http.const";
import type { I_CNode_JSON } from "../CNodeTree/CNode/index.type";
import { cNodeTree } from "../CNodeTree";
import { type T_state, DOING, FAIL, SUCCESS, UNDO } from "../Requset/index.const";
import { T_Message_from_main, ZIP_DOWNLOAD, ZIP_fail, ZIP_SAVED, ZIP_SUCCESS, type T_Message_from_worker, } from "./codeGen.worker.type";
import { downloadByA, toast_dom } from "@/lib/utils";

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
    worker: Worker | null;

    state: T_state;
    cNodeTree_JSON: I_CNode_JSON | null;
    cNodeTree_hash: string | null;
    downloadUrl_manifest: string | null;

    Dialog_show: boolean; // 弹窗展示
    content: string | null; // 弹窗content，之所以设为状态是因为有消失过渡
    tip_Icon_show: boolean; // tip_Icon展示
    tip_Icon_active: boolean; // tip_Icon的动画
    tip_text_show: boolean; // tip_text展示
    tip_text: string | null; // tip_text文案，之所以设为状态是因为有消失过渡
    firstOpen: boolean;
    tip_text_loading_first: ReturnType<typeof setTimeout> | null; // 第一次关闭时，若为加载中，提示一下

    disabledBtnDownloadBtn: boolean;
}

export class CodeGen implements I_Btn_codeGen {
    render: I_Btn_codeGen['render'];
    worker: I_Btn_codeGen['worker'];

    state: I_Btn_codeGen['state'];
    cNodeTree_JSON: I_Btn_codeGen['cNodeTree_JSON'];
    cNodeTree_hash: I_Btn_codeGen['cNodeTree_hash'];
    downloadUrl_manifest: I_Btn_codeGen['downloadUrl_manifest'];

    Dialog_show: I_Btn_codeGen['Dialog_show'];
    content: I_Btn_codeGen['content'];
    tip_Icon_show: I_Btn_codeGen['tip_Icon_show'];
    tip_Icon_active: I_Btn_codeGen['tip_Icon_active'];
    tip_text_show: I_Btn_codeGen['tip_text_show'];
    tip_text: I_Btn_codeGen['tip_text'];
    firstOpen: I_Btn_codeGen['firstOpen'];
    tip_text_loading_first: I_Btn_codeGen['tip_text_loading_first'];

    disabledBtnDownloadBtn: I_Btn_codeGen['disabledBtnDownloadBtn'];

    constructor() {
        this.worker = null;

        this.state = UNDO;
        this.cNodeTree_JSON = null;
        this.cNodeTree_hash = null;
        this.downloadUrl_manifest = null;

        this.Dialog_show = false;
        this.content = state_content[this.state];
        this.tip_Icon_show = false;
        this.tip_Icon_active = false;
        this.tip_text_show = false;
        this.tip_text = state_tip_text[this.state];
        this.firstOpen = false;
        this.tip_text_loading_first = null;

        this.disabledBtnDownloadBtn = false;
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

        const data = await connector.codeGen(this.cNodeTree_JSON, this.cNodeTree_hash);
        this.codeGen_after(data);
    }

    public async codeGenAgain() {
        this.state = DOING;
        this.content = state_content[this.state];
        this.render();
        const data = await connector.codeGen(this.cNodeTree_JSON!, this.cNodeTree_hash!);
        this.codeGen_after(data);
    }

    private codeGen_after(data: Awaited<ReturnType<typeof connector.codeGen>>) {
        if (!data) {
            this.state = FAIL;
            this.content = state_content[this.state];
        } else {
            const { birthtimeMs, downloadUrl_manifest } = data;
            this.state = SUCCESS;
            this.content = state_content[this.state](birthtimeMs);
            this.downloadUrl_manifest = downloadUrl_manifest;
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
        if (!this.downloadUrl_manifest) {
            return
        }

        this.initWorker();

        this.disabledBtnDownloadBtn = true;
        this.render();
        this.worker_send({
            type: ZIP_DOWNLOAD,
            downloadUrl_manifest: this.downloadUrl_manifest,
        });
    }

    // todo 缺了个worker的重启机制
    private initWorker() {
        if (this.worker !== null) {
            return
        }

        this.worker = new Worker(new URL('./codeGen.worker.ts', import.meta.url), { name: CodeGen.name });
        this.worker.onmessage = (({ data }) => {
            this.worker_revieve(data);
        });
    }

    private worker_revieve(message: T_Message_from_worker) {
        switch (message.type) {
            case ZIP_SUCCESS:
                const { zip } = message;
                downloadByA('project.zip', new Blob([zip]));
                this.worker_send({ type: ZIP_SAVED });
                this.disabledBtnDownloadBtn = false;
                this.render();
                break;
            case ZIP_fail:
                const errMsg = '下载zip文件失败';
                toast_dom(errMsg);
                this.disabledBtnDownloadBtn = false;
                this.render();
                break;
        }
    }

    private worker_send(message: T_Message_from_main) {
        this.worker!.postMessage(message);
    }
}

export const codeGen = new CodeGen();

