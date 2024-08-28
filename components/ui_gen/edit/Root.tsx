import React from 'react';
import { cn } from "@/lib/utils";
import type { I_Root_cNode_props } from '@/engine/CNodeTree/CNode/Foundation/Root_CNode.meta';
import type { T_CNode_Concrete } from '@/engine/CNodeTree/CNode/index.type';

interface I_Root extends React.HTMLAttributes<HTMLDivElement> {
    props: I_Root_cNode_props;
    cssStyle: T_CNode_Concrete['cssStyle'];
}

export function Root({ props, cssStyle, className, children }: I_Root) {
    return (
        <div
            style={{ ...cssStyle }}
            className={cn(`w-full h-full overflow-y-auto flex flex-wrap`
                , className)}>
            {children}
        </div>
    )
}