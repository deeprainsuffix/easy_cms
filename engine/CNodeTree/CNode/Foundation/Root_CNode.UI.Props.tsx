import React from 'react';
import type { Root_CNode } from './Root_CNode';

interface I_Root_CNode_UI_Props {
    cNode: Root_CNode;
}

export function Root_CNode_UI_Props({ cNode }: I_Root_CNode_UI_Props) {
    return (
        <div className='flex flex-col'>
            <div className='basis-[50px] flex items-center'>
                <div className='grow-0 shrink-0 basis-20 flex items-center'>
                    层级
                </div>
                <div>根节点</div>
            </div>
        </div>
    )
}