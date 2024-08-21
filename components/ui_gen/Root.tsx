import React from 'react';
import { cn } from "@/lib/utils";
import type { I_Root_cNode_props } from '@/engine/CNodeTree/CNode/Foundation/Root_CNode.meta';

interface I_Root_gen extends React.HTMLAttributes<HTMLDivElement> {
    props: I_Root_cNode_props;
    // children: React.JSX.Element[] | null;
}

export function Root_gen({ props, className, children }: I_Root_gen) {
    return (
        <div className={cn(``
            , className)}>
            {children}
        </div>
    )
}