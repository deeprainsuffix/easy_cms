import React from 'react';
import { props_Select_CNode, type Select_CNode } from "./Select_CNode";
import { Input } from '@/components/ui/input';
import { useInputOnChange } from '../Wrapper_CNode_UI_Props/useInputOnChange';

interface I_Select_CNode_UI_Props {
    cNode: Select_CNode;
}

export function Select_CNode_UI_Props({ cNode }: I_Select_CNode_UI_Props) {
    const props = cNode.props;
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    const onChange_fieldKey = useInputOnChange({ cNode, prop: props_Select_CNode.fieldKey });
    const onChange_fieldLabel = useInputOnChange({ cNode, prop: props_Select_CNode.fieldLabel });
    const onChange_fieldPlaceholder = useInputOnChange({ cNode, prop: props_Select_CNode.fieldPlaceholder });

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
                    占位提示
                </div>
                <Input defaultValue={fieldPlaceholder} onChange={onChange_fieldPlaceholder} />
            </div>
        </div>
    )
}