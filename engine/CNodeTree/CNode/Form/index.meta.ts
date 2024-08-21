export const Category_Form_meta = {
    componentCategory: 'form',
    title: '表单类',
} as const;

export const Form_CNode_props_key_base = {
    fieldKey: 'fieldKey',
    fieldLabel: 'fieldLabel',
    fieldPlaceholder: 'fieldPlaceholder',
    // fieldValue: any; // 类型由fieldValueType决定
    // fieldValueType: 'undefined' | 'null' | 'string' | 'number' | 'boolean' | 'array' | 'object';
} as const;

export interface I_Form_CNode_props_base {
    [Form_CNode_props_key_base.fieldKey]: string;
    [Form_CNode_props_key_base.fieldLabel]: string;
    [Form_CNode_props_key_base.fieldPlaceholder]: string;
}