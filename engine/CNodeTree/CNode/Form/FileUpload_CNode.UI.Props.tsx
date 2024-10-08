import React from 'react';
import { type FileUpload_CNode } from "./FileUpload_CNode";
import { Input } from '@/components/ui/input';
import { useInputOnChange } from '../useCNode_UI_Props/useInputOnChange';
import { FileUpload_CNode_props_key } from './FileUpload_CNode.meta';

interface I_FileUpload_CNode_UI_Props {
    cNode: FileUpload_CNode;
}

export function FileUpload_CNode_UI_Props({ cNode }: I_FileUpload_CNode_UI_Props) {
    const props = cNode.props;
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    const { onChange: onChange_fieldKey } = useInputOnChange(cNode, FileUpload_CNode_props_key.fieldKey);
    const { onChange: onChange_fieldLabel } = useInputOnChange(cNode, FileUpload_CNode_props_key.fieldLabel);
    const { onChange: onChange_fieldPlaceholder } = useInputOnChange(cNode, FileUpload_CNode_props_key.fieldPlaceholder);

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