import { type I_Form_CNode_props_base, Form_CNode_props_key_base } from "./index.meta";

export const FileUpload_cNode_meta = {
    componentName: 'FileUpload',
    title: '文件上传',
} as const;

export const FileUpload_CNode_props_key = Object.assign({} as const, Form_CNode_props_key_base);

export interface I_FileUpload_cNode_props extends I_Form_CNode_props_base { }