import * as React from 'react';
import { cn } from "@/lib/utils"
import { type Container_CNode, props_Container_CNode, props_Container_CNode_select } from '@/engine/CNodeTree/CNode/Layout/Container_CNode';

interface I_Container extends React.HTMLAttributes<HTMLDivElement> {
    cNode: Container_CNode;
}

export function Container(props: I_Container) {
    const { className, children, cNode } = props;
    const { props: { columnNum } } = cNode;

    return (
        <div className={cn(
            'mpg-border-8 mpg-border-dashed mpg-border-orange-700 mpg-bg-neutral-300 mpg-grid',
            className
        )}
            style={{

                gridTemplateColumns: `repeat(${columnNum}, ${Math.floor(1 / +columnNum * 100)}%)`,
                gridAutoRows: 'minmax(60px, auto)',
            }}
        >
            {children || <div className='mpg-h-1/2'>容器：待拖入其他组件</div>}
        </div>
    )
}