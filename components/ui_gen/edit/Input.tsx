import React from 'react';
import { cn } from "@/lib/utils";
import { Input as Input_Shadcn } from '../../ui/input';
import type { I_Input_cNode_props } from '@/engine/CNodeTree/CNode/Form/Input_CNode.meta';

interface I_Input extends React.HTMLAttributes<HTMLDivElement> {
    props: I_Input_cNode_props;
}

export function Input({ props, className }: I_Input) {
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    return (
        <div className={cn(`flex items-center h-[50px] p-[4px]`
            , className)}>
            <div className='flex-grow-0 flex-shrink-1 basis-[100px] flex justify-center items-center break-all'>{fieldLabel}</div>
            <div className='flex-grow-0 flex-shrink-1 basis-[200px]'>
                <Input_Shadcn placeholder={fieldPlaceholder} />
            </div>
        </div>
    )
}