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
        <div className={cn(`mpg-flex mpg-items-center
            mpg-h-[50px] mpg-p-[4px]
            mpg-border-[2px] mpg-border-solid mpg-border-s400 mpg-rounded-md`
            , className)}>
            <div className='mpg-flex-grow-0 mpg-flex-shrink-1 mpg-basis-[100px] mpg-flex mpg-justify-center mpg-items-center mpg-break-all'>{fieldLabel}</div>
            <div className='mpg-flex-grow-0 mpg-flex-shrink-1 mpg-basis-[200px]'>
                <Label htmlFor={`upload-${fieldKey}`}
                    className='mpg-self-stretch mpg-flex mpg-items-center'
                >{fieldPlaceholder}</Label>
                <Input id={`upload-${fieldKey}`} type="file" style={{ display: 'none' }} />
            </div>
        </div>
    )
}