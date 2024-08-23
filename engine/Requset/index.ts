import { httpUrl_cNodeTree_JSON_get_prefix, httpUrl_cNodeTree_JSON_save, httpUrl_landingCode_gen } from "@/server/http.url";
import { type I_CNode_JSON } from "../CNodeTree/CNode/index.type";
import { toast_dom } from "@/lib/utils";
import { cNodeTree_hash_param, cNodeTree_json_fileName_prefix } from "@/server/http.const";
import type { I_body_landingCode_gen, I_resApiBody } from "@/server/Response/HandleApi/index.type";

type T_Param_fetch = Parameters<typeof fetch>;
interface I_init extends NonNullable<T_Param_fetch[1]> {
    timeout?: number;
    errMsg_Timeout?: string;
    toast?: boolean;
}

export async function fetchReqApiWrap<T_data = any>(input: T_Param_fetch[0], init?: I_init): Promise<I_resApiBody<T_data>> {
    let result: I_resApiBody<T_data> = {
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
    if (init.timeout !== undefined) {
        timeout = init.timeout;
        if (init.errMsg_Timeout) {
            errMsg_Timeout = init.errMsg_Timeout
        }
    }
    if (timeout !== 0) {
        timer = setTimeout(() => {
            controller.abort(errMsg_Timeout);
        }, timeout);
    }

    try {
        const res = await fetch(input, init);
        result = await res.json() as I_resApiBody<T_data>;
        if (!(res.ok && result.success)) {
            throw result.errMsg
        }
    } catch (err) {
        console.log('api请求失败兜底: ', err);
        init.toast && toast_dom('' + err);
    } finally {
        if (timer !== null) {
            clearTimeout(timer);
        }
    }

    console.log('看下最终的result_api todo', result);
    return result
}

// const
//     fileType_plain = 'plain',
//     fileType_json = 'json',
//     fileType_blob = 'blob';

// type T_fileType =
//     typeof fileType_plain |
//     typeof fileType_json |
//     typeof fileType_blob
//     ;
interface I_init_file<T> extends I_init {
    fileType: T;
};

type T_fetchReqFileWrap_returnType = {
    plain: string;
    json: Object;
    blob: Blob;
};

type fileType = keyof T_fetchReqFileWrap_returnType;

export async function fetchReqFileWrap<T extends fileType>(input: T_Param_fetch[0], init?: I_init_file<T>): Promise<T_fetchReqFileWrap_returnType[T] | null> {
    // let result: T_fetchReqFileWrap_returnType[T] | null = null;
    let result: any = null; // 因为返回类型不兼容，这里用any代替，调用方的类型判断是正确的
    const controller = new AbortController();
    if (!init) {
        init = {
            fileType: 'plain',
        } as I_init_file<T>;
    };
    init.signal = controller.signal;

    let timer = null, timeout = 30 * 1000, errMsg_Timeout = '超时30s';
    if (init.timeout !== undefined) {
        timeout = init.timeout;
        if (init.errMsg_Timeout) {
            errMsg_Timeout = init.errMsg_Timeout
        }
    }
    if (timeout !== 0) {
        timer = setTimeout(() => {
            controller.abort(errMsg_Timeout);
        }, timeout);
    }

    try {
        const res = await fetch(input, init);
        if (!res.ok) {
            throw '获取文件失败' + res.status + res.statusText;
        }

        switch (init.fileType) {
            case 'plain':
                result = await res.text(); break;
            case 'json':
                result = await res.json(); break;
            case 'blob':
                result = await res.blob(); break;
        }
    } catch (err) {
        console.log('文件请求失败兜底: ', err);
        init.toast && toast_dom('' + err);
    } finally {
        if (timer !== null) {
            clearTimeout(timer);
        }
    }

    return result
}

// export async function cNodeTree_JSON_save_req(cNodeTree_JSON: I_CNode_JSON, cNodeTree_hash: string): Promise<string | null> {
//     try {
//         const jsonStr = JSON.stringify(cNodeTree_JSON);
//         const blob = new Blob([jsonStr], { type: 'application/json' });
//         const { success, data, errMsg } = await fetchReqApiWrap(`${httpUrl_cNodeTree_JSON_save}?${cNodeTree_hash_param}=${cNodeTree_hash}`, {
//             method: 'POST',
//             body: blob,
//         });

//         if (!success) {
//             throw errMsg;
//         }

//         return data
//     } catch (err) {
//         console.log('cNodeTree_JSON_save_req出错 -> ', err);
//         return null
//     }
// }

// export async function cNodeTree_JSON_get_req(cNodeTree_hash: string): Promise<I_CNode_JSON | null> {
//     try {
//         const url = `${httpUrl_cNodeTree_JSON_get_prefix}${cNodeTree_json_fileName_prefix}.${cNodeTree_hash}.json`;
//         const { success, data, errMsg } = await fetchReqFileWrap(url, { type: 'json' });
//         if (!success) {
//             throw errMsg;
//         }

//         return data
//     } catch (err) {
//         console.log('cNodeTree_JSON_get_req出错 -> ', err);
//         return null
//     }
// }

export async function landingCode_gen_req(cNodeTree_JSON: I_CNode_JSON, cNodeTree_hash: string): Promise<I_body_landingCode_gen | null> {
    try {
        const { success, data, errMsg } = await fetchReqApiWrap(httpUrl_landingCode_gen, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                json: cNodeTree_JSON,
                hash: cNodeTree_hash,
            }),
            timeout: 5 * 60 * 1000, // 5 mins
            errMsg_Timeout: '超时5分钟',
        });

        if (!success) {
            throw errMsg;
        }

        return data
    } catch (err) {
        console.log('landingCode_gen_req出错 -> ' + err);
        return null
    }
}