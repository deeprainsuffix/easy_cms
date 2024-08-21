import React from 'react';
import { type Input_CNode } from "./Input_CNode";
import { Input } from '@/components/ui/input';
import { useInputOnChange } from '../Wrapper_CNode_UI_Props/useInputOnChange';
import { Input_CNode_props_key } from './Input_CNode.meta';

interface I_Input_CNode_UI_Props {
    cNode: Input_CNode;
}

export function Input_CNode_UI_Props({ cNode }: I_Input_CNode_UI_Props) {
    const props = cNode.props;
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    const onChange_fieldKey = useInputOnChange({ cNode, prop: Input_CNode_props_key.fieldKey });
    const onChange_fieldLabel = useInputOnChange({ cNode, prop: Input_CNode_props_key.fieldLabel });
    const onChange_fieldPlaceholder = useInputOnChange({ cNode, prop: Input_CNode_props_key.fieldPlaceholder });

    return (
        <div className='mpg-flex mpg-flex-col'>
            <div className='mpg-basis-[50px] mpg-flex mpg-items-center'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    字段key
                </div>
                <Input defaultValue={fieldKey} onChange={onChange_fieldKey} />
            </div>
            <div className='mpg-basis-[50px] mpg-flex mpg-items-center'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    字段label
                </div>
                <Input defaultValue={fieldLabel} onChange={onChange_fieldLabel} />
            </div>
            <div className='mpg-basis-[50px] mpg-flex mpg-items-center'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    占位值
                </div>
                <Input defaultValue={fieldPlaceholder} onChange={onChange_fieldPlaceholder} />
            </div>
        </div>
    )
}