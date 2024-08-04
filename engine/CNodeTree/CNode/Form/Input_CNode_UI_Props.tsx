import React from 'react';
import { props_Input_cNode, type Input_CNode } from "./Input_CNode";
import { Input } from '@/components/ui/input';
import { useOnChangeInput } from '../Wrapper_CNode_UI_Props/useOnChangeInput';

interface I_Input_CNode_UI_Props {
    cNode: Input_CNode;
}

export function Input_CNode_UI_Props({ cNode }: I_Input_CNode_UI_Props) {
    const props = cNode.props;
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    const onChange_fieldKey = useOnChangeInput({ cNode, prop: props_Input_cNode.fieldKey });
    const onChange_fieldLabel = useOnChangeInput({ cNode, prop: props_Input_cNode.fieldLabel });
    const onChange_fieldPlaceholder = useOnChangeInput({ cNode, prop: props_Input_cNode.fieldPlaceholder });

    return (
        <div>
            <div className='mpg-flex mpg-m-3'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    字段key
                </div>
                <Input defaultValue={fieldKey} onChange={onChange_fieldKey} />
            </div>
            <div className='mpg-flex mpg-m-3'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    字段label
                </div>
                <Input defaultValue={fieldLabel} onChange={onChange_fieldLabel} />
            </div>
            <div className='mpg-flex mpg-m-3'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    占位值
                </div>
                <Input defaultValue={fieldPlaceholder} onChange={onChange_fieldPlaceholder} />
            </div>
        </div>
    )
}