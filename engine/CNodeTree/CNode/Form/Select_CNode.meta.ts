import { type I_Form_CNode_props_base, Form_CNode_props_key_base } from "./index.meta";

export const Select_cNode_meta = {
    componentName: 'Select',
    title: '下拉选择框',
} as const;

export const Select_CNode_props_key = Object.assign({} as const, Form_CNode_props_key_base);

export interface I_Select_cNode_props extends I_Form_CNode_props_base { }