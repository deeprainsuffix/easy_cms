import React from 'react';
import { cn } from "@/lib/utils";
import type { I_FormBlock_cNode_props, FormBlock_CNode_props_key } from '@/engine/CNodeTree/CNode/Layout/FormBlock_CNode.meta';

interface I_FormBlock_gen extends React.HTMLAttributes<HTMLDivElement> {
    props: Omit<I_FormBlock_cNode_props, typeof FormBlock_CNode_props_key['widthRadio_prev'] | typeof FormBlock_CNode_props_key['columnNum_prev']>;
    // children: React.JSX.Element[] | null;
}

export function FormBlock_gen({ props, className, children }: I_FormBlock_gen) {
    const widthRadio = props.widthRadio,
        columnNum = +props.columnNum;

    const grid = children ? {
        display: 'grid',
        gridTemplateColumns: `repeat(${columnNum}, ${Math.floor(1 / +columnNum * 100)}%)`,
        gridAutoRows: 'minmax(60px, auto)',
    } : {};

    return (
        <div className={cn(``
            , className)}
            style={{
                width: widthRadio,
                ...grid,
            }}>
            {children}
        </div >
    )
}