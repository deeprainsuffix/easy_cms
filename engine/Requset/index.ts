import { httpUrl_cNodeTree_JSON_get_prefix, httpUrl_cNodeTree_JSON_save } from "@/server/Response/http_url";
import { type I_CNode_JSON } from "../CNodeTree/CNode/type";
import { type T_resApiBody } from "@/server/Response";
import { toast_dom } from "@/lib/utils";
import { cNodeTree_hash_param, cNodeTree_json_fileName_prefix } from "@/server/Response/http_const";

type T_Param_fetch = Parameters<typeof fetch>;
interface I_init extends NonNullable<T_Param_fetch[1]> {
    timeout?: number;
    errMsg_Timeout?: string;
    toast?: boolean;
}

async function fetchReqApiWrap(input: T_Param_fetch[0], init?: I_init): Promise<T_resApiBody> {
    let result: T_resApiBody = {
        success: false,
        data: null,
        errMsg: '',
    };

    const controller = new AbortController();
    if (!init) {
        init = {};
    }
    init.signal = controller.signal;

    let timer = null, timeout = 30 * 1000, errMsg_Timeout = '超时30s';
    if (init.timeout) {
        timeout = init.timeout;
        if (init.errMsg_Timeout) {
            errMsg_Timeout = init.errMsg_Timeout
        }
    }
    timer = setTimeout(() => {
        controller.abort(errMsg_Timeout);
    }, timeout);

    try {
        const res = await fetch(input, init);
        result = await res.json() as T_resApiBody;
        if (!(res.ok && result.success)) {
            throw result.errMsg
        }
    } catch (err) {
        console.log('api请求失败兜底: ', err);
        init.toast && toast_dom('' + err);
    } finally {
        clearTimeout(timer);
    }

    console.log('看下最终的result_api todo', result);
    return result
}

interface I_init_file extends I_init {
    type: 'plain' | 'json';
}
interface T_fetchWrap_result extends Omit<T_resApiBody, 'data'> {
    data: any;
};

async function fetchReqFileWrap(input: T_Param_fetch[0], init?: I_init_file): Promise<T_fetchWrap_result> {
    let result: T_fetchWrap_result = {
        success: false,
        data: null,
        errMsg: '',
    };

    const controller = new AbortController();
    if (!init) {
        init = {
            type: 'plain',
        };
    }
    init.signal = controller.signal;

    let timer = null, timeout = 30 * 1000, errMsg_Timeout = '超时30s';
    if (init.timeout) {
        timeout = init.timeout;
        if (init.errMsg_Timeout) {
            errMsg_Timeout = init.errMsg_Timeout
        }
    }
    timer = setTimeout(() => {
        controller.abort(errMsg_Timeout);
    }, timeout);

    try {
        const res = await fetch(input, init);
        if (!res.ok) {
            result.errMsg = (await res.json() as T_resApiBody).errMsg;
            throw result.errMsg
        }

        switch (init.type) {
            case 'plain':
                result.data = await res.text(); break;
            case 'json':
                result.data = await res.json(); break;
        }
        result.success = true;
    } catch (err) {
        console.log('文件请求失败兜底: ', err);
        init.toast && toast_dom('' + err);
    } finally {
        clearTimeout(timer);
    }

    console.log('看下最终的result_file todo', result);
    return result
}

export async function cNodeTree_JSON_save_req(cNodeTree_JSON: I_CNode_JSON, cNodeTree_hash: string): Promise<string | null> {
    try {
        const jsonStr = JSON.stringify(cNodeTree_JSON);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const { success, data, errMsg } = await fetchReqApiWrap(`${httpUrl_cNodeTree_JSON_save}?${cNodeTree_hash_param}=${cNodeTree_hash}`, {
            method: 'POST',
            body: blob,
        });

        if (!success) {
            throw errMsg;
        }

        return data
    } catch (err) {
        console.log('cNodeTree_JSON_save_req出错 -> ', err);
        return null
    }
}

export async function cNodeTree_JSON_get_req(cNodeTree_hash: string): Promise<I_CNode_JSON | null> {
    try {
        const url = `${httpUrl_cNodeTree_JSON_get_prefix}${cNodeTree_json_fileName_prefix}.${cNodeTree_hash}.json`;
        const { success, data, errMsg } = await fetchReqFileWrap(url, { type: 'json' });
        if (!success) {
            throw errMsg;
        }

        return data
    } catch (err) {
        console.log('cNodeTree_JSON_get_req出错 -> ', err);
        return null
    }
}