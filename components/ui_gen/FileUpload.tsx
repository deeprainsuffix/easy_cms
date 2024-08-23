import React from 'react';
import { cn } from "@/lib/utils";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import type { I_FileUpload_cNode_props } from '@/engine/CNodeTree/CNode/Form/FileUpload_CNode.meta';

interface I_FileUpload_gen extends React.HTMLAttributes<HTMLDivElement> {
    props: I_FileUpload_cNode_props;
}

export function FileUpload_gen({ props, className }: I_FileUpload_gen) {
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    return (
        <div className={cn(`flex items-center h-[50px] p-[4px]`
            , className)}>
            <div className='flex-grow-0 flex-shrink-1 basis-[100px] flex justify-center items-center break-all'>{fieldLabel}</div>
            <div className='flex-grow-0 flex-shrink-1 basis-[200px]'>
                <Label htmlFor={`upload-${fieldKey}`}
                    className='self-stretch flex items-center'
                >{fieldPlaceholder}</Label>
                <Input id={`upload-${fieldKey}`} type="file" style={{ display: 'none' }} />
            </div>
        </div>
    )
}