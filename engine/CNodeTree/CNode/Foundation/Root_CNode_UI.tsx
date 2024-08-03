import React from 'react';
import type { Root_CNode } from './Root_CNode';
import { CNode_UI_DropAsChild } from '../Wrapper_CNode_UI/CNode_UI_DropAsChild';
import { CNode_UI_Mouse } from '../Wrapper_CNode_UI/CNode_UI_Mouse';

interface I_Root_CNode_UI {
    cNode: Root_CNode;
    children: React.ReactNode[];
}

export function Root_CNode_UI(props: I_Root_CNode_UI) {
    const { cNode, children } = props;

    return (
        <div
            id={cNode.id} ref={cNode.ref}
            className='mpg-h-full mpg-border-8 mpg-border-solid mpg-border-orange-500'
        >
            <CNode_UI_Mouse cNode={cNode} className='mpg-h-full'>
                <CNode_UI_DropAsChild cNode={cNode} className='mpg-h-full'>
                    {children}
                </CNode_UI_DropAsChild>
            </CNode_UI_Mouse>
        </div>
    )
}