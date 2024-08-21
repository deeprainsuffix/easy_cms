import { type I_Form_CNode_props_base, Form_CNode_props_key_base } from "./index.meta";

export const Input_cNode_meta = {
    componentName: 'Input',
    title: '输入框',
} as const;

export const Input_CNode_props_key = Object.assign({} as const, Form_CNode_props_key_base);

export interface I_Input_cNode_props extends I_Form_CNode_props_base { }