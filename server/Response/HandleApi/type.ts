import http from 'http';

type T_requestListener = NonNullable<Parameters<typeof http.createServer>[1]>;
export type T_http_req = Parameters<T_requestListener>[0];
export type T_http_res = Parameters<T_requestListener>[1];


// api响应结构
interface T_resApiInfo_success {
    data: any;
};
interface T_resApiInfo_fail {
    errMsg: string;
};
export type T_resApiInfo = T_resApiInfo_success | T_resApiInfo_fail;

export interface T_resApiBody {
    success: boolean;
    data: T_resApiInfo_success['data'];
    errMsg: T_resApiInfo_fail['errMsg'];
};