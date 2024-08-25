import React from 'react';
import { type Input_CNode } from "./Input_CNode";
import { Input } from '@/components/ui/input';
import { useInputOnChange } from '../useCNode_UI_Props/useInputOnChange';
import { Input_CNode_props_key } from './Input_CNode.meta';

interface I_Input_CNode_UI_Props {
    cNode: Input_CNode;
}

export function Input_CNode_UI_Props({ cNode }: I_Input_CNode_UI_Props) {
    const props = cNode.props;
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    const { onChange: onChange_fieldKey } = useInputOnChange(cNode, Input_CNode_props_key.fieldKey);
    const { onChange: onChange_fieldLabel } = useInputOnChange(cNode, Input_CNode_props_key.fieldLabel);
    const { onChange: onChange_fieldPlaceholder } = useInputOnChange(cNode, Input_CNode_props_key.fieldPlaceholder);

    return (
        <div className='flex flex-col'>
            <div className='basis-[50px] flex items-center'>
                <div className='grow-0 shrink-0 basis-20 flex items-center'>
                    字段key
                </div>
                <Input defaultValue={fieldKey} onChange={onChange_fieldKey} />
            </div>
            <div className='basis-[50px] flex items-center'>
                <div className='grow-0 shrink-0 basis-20 flex items-center'>
                    字段label
                </div>
                <Input defaultValue={fieldLabel} onChange={onChange_fieldLabel} />
            </div>
            <div className='basis-[50px] flex items-center'>
                <div className='grow-0 shrink-0 basis-20 flex items-center'>
                    占位值
                </div>
                <Input defaultValue={fieldPlaceholder} onChange={onChange_fieldPlaceholder} />
            </div>
        </div>
    )
}