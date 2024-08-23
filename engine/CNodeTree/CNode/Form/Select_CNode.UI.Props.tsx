import React from 'react';
import { type Select_CNode } from "./Select_CNode";
import { Input } from '@/components/ui/input';
import { useInputOnChange } from '../Wrapper_CNode_UI_Props/useInputOnChange';
import { Select_CNode_props_key } from './Select_CNode.meta';

interface I_Select_CNode_UI_Props {
    cNode: Select_CNode;
}

export function Select_CNode_UI_Props({ cNode }: I_Select_CNode_UI_Props) {
    const props = cNode.props;
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    const onChange_fieldKey = useInputOnChange({ cNode, prop: Select_CNode_props_key.fieldKey });
    const onChange_fieldLabel = useInputOnChange({ cNode, prop: Select_CNode_props_key.fieldLabel });
    const onChange_fieldPlaceholder = useInputOnChange({ cNode, prop: Select_CNode_props_key.fieldPlaceholder });

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
                    占位提示
                </div>
                <Input defaultValue={fieldPlaceholder} onChange={onChange_fieldPlaceholder} />
            </div>
        </div>
    )
}