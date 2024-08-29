import React from 'react';
import { cn } from "@/lib/utils";
import {
    Select as Select_shadcn,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { I_Input_cNode_props } from '@/engine/CNodeTree/CNode/Form/Input_CNode.meta';
import type { T_CNode } from '@/engine/CNodeTree/CNode/index.type';

interface I_Select extends React.HTMLAttributes<HTMLDivElement> {
    props: I_Input_cNode_props;
    cssStyle: T_CNode['cssStyle'];
}

export function Select({ props, cssStyle, className }: I_Select) {
    const { fieldKey, fieldLabel, fieldPlaceholder } = props;

    return (
        <div
            style={{ ...cssStyle }}
            className={cn(`flex items-center h-[50px] p-[4px]`
                , className
            )}>
            <div className='flex-grow-0 flex-shrink-1 basis-[100px] flex justify-center items-center break-all'>{fieldLabel}</div>
            <div className='flex-grow-0 flex-shrink-1 basis-[200px]'>
                <Select_shadcn>
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
                </Select_shadcn>
            </div>
        </div>
    )
}