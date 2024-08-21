import React from 'react';
import { cn } from "@/lib/utils";
import type { I_FormBlock_cNode_props } from '@/engine/CNodeTree/CNode/Layout/FormBlock_CNode.meta';

interface I_FormBlock_gen extends React.HTMLAttributes<HTMLDivElement> {
    props: I_FormBlock_cNode_props;
    // children: React.JSX.Element[] | null;
}

export function FormBlock_gen({ props, className, children }: I_FormBlock_gen) {
    const columnNum = +props.columnNum;

    return (
        <div className={cn(`mpg-min-h-[70px]
            mpg-border-[1px] mpg-border-dashed mpg-border-s500 mpg-bg-s300`
            , className)}>
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
                        {children}
                    </div>
                    :
                    <div className='mpg-h-[68px] mpg-flex mpg-justify-center mpg-items-center'>表单块：待拖入其他表单组件</div>
            }
        </div>
    )
}