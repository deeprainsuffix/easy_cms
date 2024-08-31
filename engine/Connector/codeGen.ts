import { connector } from ".";
import dayjs from 'dayjs';
import { landing_project_clearTimeMs } from "@/server/http.const";
import type { I_CNode_JSON } from "../CNodeTree/CNode/index.type";
import { cNodeTree } from "../CNodeTree";
import { type T_state, DOING, FAIL, SUCCESS, UNDO } from "../Requset/index.const";
import { T_Message_from_main, ZIP_DOWNLOAD, ZIP_fail, ZIP_SAVED, ZIP_SUCCESS, type T_Message_from_worker, } from "./codeGen.worker.type";
import { downloadByA, toast_dom } from "@/lib/utils";
import type { I_req_landingCode_gen } from "@/server/Response/HandleApi/index.type";

const
    state_tip_text = {
        [UNDO]: null,
        [DOING]: '生成中，请稍后',
        [SUCCESS]: '点击查看',
        [FAIL]: '出错啦',
    } as const;

export type T_region = {
    [p in NonNullable<keyof NonNullable<I_req_landingCode_gen['region']>>]: boolean;
}

interface I_Btn_codeGen {
    render: any;
    worker: Worker | null;

    state: T_state;
    cNodeTree_JSON: I_CNode_JSON | null;
    cNodeTree_hash: string | null;
    region: T_region;
    data: Awaited<ReturnType<typeof connector.codeGen>> | null;

    Dialog_show: boolean; // 弹窗展示
    tip_Icon_show: boolean; // tip_Icon展示
    tip_Icon_active: boolean; // tip_Icon的动画
    tip_text_show: boolean; // tip_text展示
    tip_text: string | null; // tip_text文案，之所以设为状态是因为有消失过渡
    firstOpen: boolean;
    tip_text_loading_first: ReturnType<typeof setTimeout> | null; // 第一次关闭时，若为加载中，提示一下

    disabledBtnDownloadZip: boolean;
}

export class CodeGen implements I_Btn_codeGen {
    render: I_Btn_codeGen['render'];
    worker: I_Btn_codeGen['worker'];

    state: I_Btn_codeGen['state'];
    cNodeTree_JSON: I_Btn_codeGen['cNodeTree_JSON'];
    cNodeTree_hash: I_Btn_codeGen['cNodeTree_hash'];
    region: I_Btn_codeGen['region'];
    data: I_Btn_codeGen['data'];

    Dialog_show: I_Btn_codeGen['Dialog_show'];
    tip_Icon_show: I_Btn_codeGen['tip_Icon_show'];
    tip_Icon_active: I_Btn_codeGen['tip_Icon_active'];
    tip_text_show: I_Btn_codeGen['tip_text_show'];
    tip_text: I_Btn_codeGen['tip_text'];
    firstOpen: I_Btn_codeGen['firstOpen'];
    tip_text_loading_first: I_Btn_codeGen['tip_text_loading_first'];

    disabledBtnDownloadZip: I_Btn_codeGen['disabledBtnDownloadZip'];

    constructor() {
        this.worker = null;

        this.state = UNDO;
        this.cNodeTree_JSON = null;
        this.cNodeTree_hash = null;
        this.region = {
            RegionHeader: true,
            RegionSideMenuBar: true,
        };
        this.data = null;

        this.Dialog_show = false;
        this.tip_Icon_show = false;
        this.tip_Icon_active = false;
        this.tip_text_show = false;
        this.tip_text = state_tip_text[this.state];
        this.firstOpen = false;
        this.tip_text_loading_first = null;

        this.disabledBtnDownloadZip = false;
    }

    public async codeGen() {
        this.state = DOING;
        this.render();
        if (!(this.cNodeTree_JSON && this.cNodeTree_hash)) {
            const { cNodeTree_JSON, cNodeTree_hash } = await cNodeTree.getCNodeTreeJSON();
            this.cNodeTree_JSON = cNodeTree_JSON;
            this.cNodeTree_hash = cNodeTree_hash;
        }

        const data = await connector.codeGen({
            cNodeTree_JSON: this.cNodeTree_JSON,
            cNodeTree_hash: this.cNodeTree_hash,
            region: this.region,
        });
        this.codeGen_after(data);
    }

    private codeGen_after(data: Awaited<ReturnType<typeof connector.codeGen>>) {
        this.cNodeTree_JSON = null;
        this.cNodeTree_hash = null;
        if (!data) {
            this.state = FAIL;
        } else {
            this.state = SUCCESS;
            this.data = data;
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

    public open() {
        this.firstOpen = true;
        this.Dialog_show = true;
        this.tip_Icon_show = true;
        this.tip_Icon_active = false;
        this.tip_text_show = false;
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

    public setRegion(regionKey: keyof I_Btn_codeGen['region'], show: boolean) {
        this.region[regionKey] = show;
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
        if (!this.data) {
            return
        }

        this.initWorker();

        this.disabledBtnDownloadZip = true;
        this.render();
        this.worker_send({
            type: ZIP_DOWNLOAD,
            downloadUrl_manifest: this.data.downloadUrl_manifest,
        });
    }

    // todo 缺了个worker的重启机制
    private initWorker() {
        if (this.worker !== null) {
            return
        }

        this.worker = new Worker(
            new URL('./codeGen.worker.ts', import.meta.url), { name: CodeGen.name, type: 'module' }
        );
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
                this.disabledBtnDownloadZip = false;
                this.render();
                break;
            case ZIP_fail:
                const errMsg = '下载zip文件失败';
                toast_dom(errMsg);
                this.disabledBtnDownloadZip = false;
                this.render();
                break;
        }
    }

    private worker_send(message: T_Message_from_main) {
        this.worker!.postMessage(message);
    }
}

export const codeGen = new CodeGen();

