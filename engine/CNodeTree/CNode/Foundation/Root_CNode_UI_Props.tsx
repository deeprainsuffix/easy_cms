import React from 'react';
import type { Root_CNode } from './Root_CNode';

interface I_Root_CNode_UI_Props {
    cNode: Root_CNode;
}

export function Root_CNode_UI_Props({ cNode }: I_Root_CNode_UI_Props) {
    return (
        <div>
            <div className='mpg-flex mpg-m-3'>
                <div className='mpg-grow-0 mpg-shrink-0 mpg-basis-20 mpg-flex mpg-items-center'>
                    层级
                </div>
                <div>根节点</div>
            </div>
        </div>
    )
}