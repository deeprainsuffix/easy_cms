import React from 'react';
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { I_Input_cNode_props } from '@/engine/CNodeTree/CNode/Form/Input_CNode.meta';

interface I_Select_gen extends React.HTMLAttributes<HTMLDivElement> {
    props: I_Input_cNode_props;
}

export function Select_gen({ props, className }: I_Select_gen) {
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    return (
        <div className={cn(`mpg-flex mpg-items-center
            mpg-h-[50px] mpg-p-[4px]
            mpg-border-[2px] mpg-border-solid mpg-border-s400 mpg-rounded-md`
            , className
        )}>
            <div className='mpg-flex-grow-0 mpg-flex-shrink-1 mpg-basis-[100px] mpg-flex mpg-justify-center mpg-items-center mpg-break-all'>{fieldLabel}</div>
            <div className='mpg-flex-grow-0 mpg-flex-shrink-1 mpg-basis-[200px]'>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder={fieldPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>选项：</SelectLabel>
                            <SelectItem value="1">选项1</SelectItem>
                            <SelectItem value="2">选项2</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}