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
        <div className={cn(`mpg-flex mpg-items-center
            mpg-h-[50px] mpg-p-[4px]
            mpg-border-[2px] mpg-border-solid mpg-border-s400 mpg-rounded-md`
            , className)}>
            <div className='mpg-flex-grow-0 mpg-flex-shrink-1 mpg-basis-[100px] mpg-flex mpg-justify-center mpg-items-center mpg-break-all'>{fieldLabel}</div>
            <div className='mpg-flex-grow-0 mpg-flex-shrink-1 mpg-basis-[200px]'>
                <Input placeholder={fieldPlaceholder} />
            </div>
        </div>
    )
}