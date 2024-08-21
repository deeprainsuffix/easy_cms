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
        <div className='mpg-flex mpg-flex-col'>
            <div className='mpg-basis-[50px] mpg-flex mpg-items-center'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    宽度占比
                </div>
                <SelectSingle options={FormBlock_CNode_props_select[FormBlock_CNode_props_key['widthRadio']]} defaultValue={widthRadio} onValueChange={onChange_widthRadio} />
            </div>
            <div className='mpg-basis-[50px] mpg-flex mpg-items-center'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    列数量
                </div>
                <SelectSingle options={FormBlock_CNode_props_select[FormBlock_CNode_props_key['columnNum']]} defaultValue={columnNum} onValueChange={onChange_columnNum} />
            </div>
        </div>
    )
}