import React, { useCallback } from 'react';
import { type FormBlock_CNode } from "./FormBlock_CNode";
import { SelectSingle } from '@/components/ui_custom/SelectSingle';
import { useSelectSingleOnChange } from '../Wrapper_CNode_UI_Props/useSelectSingleOnChange';
import { FormBlock_CNode_props_key, FormBlock_CNode_props_select } from './FormBlock_CNode.meta';
// import { Input } from '@/components/ui/input';
// import { useInputOnChange } from '../Wrapper_CNode_UI_Props/useInputOnChange';

interface I_FormBlock_CNode_UI_Props {
    cNode: FormBlock_CNode;
}

export function FormBlock_CNode_UI_Props({ cNode }: I_FormBlock_CNode_UI_Props) {
    const props = cNode.props;
    const { widthRadio, columnNum } = props;

    const onChange_widthRadio = useSelectSingleOnChange({ cNode, prop: FormBlock_CNode_props_key.widthRadio });
    const onChange_columnNum = useSelectSingleOnChange({ cNode, prop: FormBlock_CNode_props_key.columnNum });

    return (
        <div className='flex flex-col'>
            <div className='basis-[50px] flex items-center'>
                <div className='grow-0 shrink-0 basis-20 flex items-center'>
                    宽度占比
                </div>
                <SelectSingle options={FormBlock_CNode_props_select[FormBlock_CNode_props_key['widthRadio']]} defaultValue={widthRadio} onValueChange={onChange_widthRadio} />
            </div>
            <div className='basis-[50px] flex items-center'>
                <div className='grow-0 shrink-0 basis-20 flex items-center'>
                    列数量
                </div>
                <SelectSingle options={FormBlock_CNode_props_select[FormBlock_CNode_props_key['columnNum']]} defaultValue={columnNum} onValueChange={onChange_columnNum} />
            </div>
        </div>
    )
}