import React, { useCallback } from 'react';
import { props_Container_CNode, props_Container_CNode_select, type Container_CNode } from "./Container_CNode";
import { SelectSingle } from '@/components/ui_custom/SelectSingle';
import { useSelectSingleOnChange } from '../Wrapper_CNode_UI_Props/useSelectSingleOnChange';
// import { Input } from '@/components/ui/input';
// import { useInputOnChange } from '../Wrapper_CNode_UI_Props/useInputOnChange';

interface I_Container_CNode_UI_Props {
    cNode: Container_CNode;
}

export function Container_CNode_UI_Props({ cNode }: I_Container_CNode_UI_Props) {
    const props = cNode.props;
    const { widthRadio, columnNum } = props;

    const onChange_widthRadio = useSelectSingleOnChange({ cNode, prop: props_Container_CNode.widthRadio });
    const onChange_columnNum = useSelectSingleOnChange({ cNode, prop: props_Container_CNode.columnNum });

    return (
        <div>
            <div className='mpg-flex mpg-m-3'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    宽度占比
                </div>
                <SelectSingle options={props_Container_CNode_select[props_Container_CNode['widthRadio']]} defaultValue={widthRadio} onValueChange={onChange_widthRadio} />
            </div>
            <div className='mpg-flex mpg-m-3'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    列数量
                </div>
                <SelectSingle options={props_Container_CNode_select[props_Container_CNode['columnNum']]} defaultValue={columnNum} onValueChange={onChange_columnNum} />
            </div>
        </div>
    )
}