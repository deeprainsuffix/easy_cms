import React from 'react';
import { cn } from "@/lib/utils";
import type { I_FormBlock_cNode_props, FormBlock_CNode_props_key } from '@/engine/CNodeTree/CNode/Layout/FormBlock_CNode.meta';

interface I_FormBlock extends React.HTMLAttributes<HTMLDivElement> {
    props: Omit<I_FormBlock_cNode_props, typeof FormBlock_CNode_props_key['widthRadio_prev'] | typeof FormBlock_CNode_props_key['columnNum_prev']>;
    // children: React.JSX.Element[] | null;
}

export function FormBlock({ props, className, children }: I_FormBlock) {
    const
        columnNum = +props.columnNum,
        { widthRadio, regionName } = props;

    if (!children) {
        return null
    }

    const grid = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columnNum}, ${Math.floor(1 / +columnNum * 100)}%)`,
        gridAutoRows: 'minmax(60px, auto)',
    };

    return (
        <div className='w-full basis-full'>
            <div className='h-6 leading-6 px-2 mt-2'>{regionName}</div>
            <div className={cn(``
                , className)}
                style={{
                    width: widthRadio,
                    ...grid,
                }}>
                {children}
            </div >
        </div>
    )
}