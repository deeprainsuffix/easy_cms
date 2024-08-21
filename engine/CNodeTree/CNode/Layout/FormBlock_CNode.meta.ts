export const FormBlock_cNode_meta = {
    componentName: 'FormBlock',
    title: '表单块',
} as const;

export const FormBlock_CNode_props_key = {
    widthRadio: 'widthRadio',
    widthRadio_prev: 'widthRadio_prev',
    columnNum: 'columnNum',
    columnNum_prev: 'columnNum_prev',
} as const;

// props中需要使用固定字段的select的直接在meta把value和text这里定义好就行
export const FormBlock_CNode_props_select = {
    [FormBlock_CNode_props_key.widthRadio]: [
        {
            value: '100%',
            text: '100%',
        },
        {
            value: '50%',
            text: '50%',
        },
    ],
    [FormBlock_CNode_props_key.columnNum]: [
        {
            value: '1',
            text: '一栏'
        },
        {
            value: '2',
            text: '两栏'
        },
        {
            value: '3',
            text: '三栏'
        },
        {
            value: '4',
            text: '四栏'
        },
    ]
} as const;

export interface I_FormBlock_cNode_props {
    [FormBlock_CNode_props_key.widthRadio]: typeof FormBlock_CNode_props_select['widthRadio'][number]['value'];
    [FormBlock_CNode_props_key.widthRadio_prev]: typeof FormBlock_CNode_props_select['widthRadio'][number]['value'];
    [FormBlock_CNode_props_key.columnNum]: typeof FormBlock_CNode_props_select['columnNum'][number]['value'];
    [FormBlock_CNode_props_key.columnNum_prev]: typeof FormBlock_CNode_props_select['columnNum'][number]['value'];
};