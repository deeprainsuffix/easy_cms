import React from 'react';
import { cn } from "@/lib/utils";
import type { I_Root_cNode_props } from '@/engine/CNodeTree/CNode/Foundation/Root_CNode.meta';

interface I_Root extends React.HTMLAttributes<HTMLDivElement> {
    props: I_Root_cNode_props;
    // children: React.JSX.Element[] | null;
}

export function Root({ props, className, children }: I_Root) {
    return (
        <div className={cn(`w-full h-full overflow-y-auto flex flex-wrap`
            , className)}>
            {children}
        </div>
    )
}