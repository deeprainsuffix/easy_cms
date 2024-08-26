import React from 'react';
import { cn } from "@/lib/utils";
import type { I_FormBlock_cNode_props } from '@/engine/CNodeTree/CNode/Layout/FormBlock_CNode.meta';

interface I_FormBlock extends React.HTMLAttributes<HTMLDivElement> {
    props: I_FormBlock_cNode_props;
}

export function FormBlock({ props, className, children }: I_FormBlock) {
    const columnNum = +props.columnNum;
    const { regionName } = props;

    const gapPercent = 2;

    return (
        <div className={cn(`min-h-[70px]
            border-[1px] border-dashed border-s500 bg-s300`
            , className)}>
            {
                children
                    ?
                    <>
                        <div className='h-6 leading-6 px-2 mt-2'>{regionName}</div>
                        <div className='grid items-center p-[4px]'
                            style={{
                                gridTemplateColumns: `repeat(${columnNum}, ${1 / columnNum * (100 - gapPercent * (columnNum - 1))}%)`,
                                gridAutoRows: 'minmax(60px, auto)',
                                gap: `${gapPercent}%`
                            }}
                        >
                            {children}
                        </div>
                    </>
                    :
                    <div className='h-[68px] flex justify-center items-center'>表单块：待拖入其他表单组件</div>
            }
        </div>
    )
}