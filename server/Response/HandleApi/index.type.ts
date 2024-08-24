import type { I_CNode_JSON } from '@/engine/CNodeTree/CNode/index.type';
import type { RegionHeader, RegionSideMenuBar } from '@/engine/Complier/template';
import http from 'http';

type T_requestListener = NonNullable<Parameters<typeof http.createServer>[1]>;
export type T_http_req = Parameters<T_requestListener>[0];
export type T_http_res = Parameters<T_requestListener>[1];


// api接口响应体结构
export interface I_resApiBody<T_data> {
    success: boolean;
    data: T_data | null;
    errMsg: string;
};

// 方便服务端返回用的
export type T_errMsgOrData<T_data> =
    { data: I_resApiBody<T_data>['data'] } |
    { errMsg: I_resApiBody<T_data>['errMsg'] }
    ;


export interface I_req_landingCode_gen {
    cNodeTree_JSON: I_CNode_JSON,
    cNodeTree_hash: string;
    region?: {
        [RegionHeader]?: boolean;
        [RegionSideMenuBar]?: boolean;
    }
};
export interface I_res_landingCode_gen {
    birthtimeMs: number;
    downloadUrl_manifest: string;
};