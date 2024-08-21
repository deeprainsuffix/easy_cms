import React from 'react';
import { type FileUpload_CNode } from "./FileUpload_CNode";
import { Input } from '@/components/ui/input';
import { useInputOnChange } from '../Wrapper_CNode_UI_Props/useInputOnChange';
import { FileUpload_CNode_props_key } from './FileUpload_CNode.meta';

interface I_FileUpload_CNode_UI_Props {
    cNode: FileUpload_CNode;
}

export function FileUpload_CNode_UI_Props({ cNode }: I_FileUpload_CNode_UI_Props) {
    const props = cNode.props;
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    const onChange_fieldKey = useInputOnChange({ cNode, prop: FileUpload_CNode_props_key.fieldKey });
    const onChange_fieldLabel = useInputOnChange({ cNode, prop: FileUpload_CNode_props_key.fieldLabel });
    const onChange_fieldPlaceholder = useInputOnChange({ cNode, prop: FileUpload_CNode_props_key.fieldPlaceholder });

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