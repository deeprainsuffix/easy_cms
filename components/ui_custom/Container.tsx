import * as React from 'react';
import { cn } from "@/lib/utils"
import { type Container_CNode, props_Container_CNode, props_Container_CNode_select } from '@/engine/CNodeTree/CNode/Layout/Container_CNode';
import { type CNode } from '@/engine/CNodeTree/CNode';

export interface I_children_item extends React.JSX.Element {
    props: {
        cNode: CNode;
    };
}

interface I_Container extends React.HTMLAttributes<HTMLDivElement> {
    cNode: Container_CNode;
    children: I_children_item[] | null;
}

export function Container(props: I_Container) {
    const { className, children, cNode } = props;
    const { props: { columnNum } } = cNode;

    return (
        <div className={cn(
            `mpg-min-h-[70px]
            mpg-border-[1px] mpg-border-dashed mpg-border-s500 mpg-bg-s300
            `,
            className
        )}>
            {
                children
                    ?
                    <div className={`mpg-grid mpg-items-center
                        mpg-p-[4px]`}
                        style={{
                            gridTemplateColumns: `repeat(${columnNum}, ${Math.floor(1 / +columnNum * 100)}%)`,
                            gridAutoRows: 'minmax(60px, auto)',
                        }}
                    >
                        {/* {children.map(UI => {
                            return (
                                <div>
                                    todo
                                </div>
                            )
                        })} */}
                        {children}
                    </div>
                    :
                    <div className='mpg-h-[68px] mpg-flex mpg-justify-center mpg-items-center'>容器：待拖入其他组件</div>
            }
        </div>
    )
}