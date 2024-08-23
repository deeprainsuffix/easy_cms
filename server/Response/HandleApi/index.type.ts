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

export interface I_body_landingCode_gen {
    birthtimeMs: number;
    downloadUrl_manifest: string;
};