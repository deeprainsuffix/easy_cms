import React from 'react';
import { cn } from "@/lib/utils";
import { Input } from '../ui/input';
import type { I_Input_cNode_props } from '@/engine/CNodeTree/CNode/Form/Input_CNode.meta';

interface I_Input_gen extends React.HTMLAttributes<HTMLDivElement> {
    props: I_Input_cNode_props;
}

export function Input_gen({ props, className }: I_Input_gen) {
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    return (
        <div className={cn(`flex items-center
            h-[50px] p-[4px]
            border-[2px] border-solid border-s400 rounded-md`
            , className)}>
            <div className='flex-grow-0 flex-shrink-1 basis-[100px] flex justify-center items-center break-all'>{fieldLabel}</div>
            <div className='flex-grow-0 flex-shrink-1 basis-[200px]'>
                <Input placeholder={fieldPlaceholder} />
            </div>
        </div>
    )
}