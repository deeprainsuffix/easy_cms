import React from 'react';
import type { Root_cNode } from './Root_cNode';
import { ActiveDropAsChild } from '../ActiveWrap/ActiveDropAsChild';
import { ActiveMouse } from '../ActiveWrap/ActiveMouse';

interface I_Root_active {
    cNode: Root_cNode;
    children: React.ReactNode[];
}
export function Root_active(props: I_Root_active) {
    const { cNode, children } = props;

    return (
        <div
            id={cNode.id} ref={cNode.ref}
            className='mpg-h-full mpg-border-8 mpg-border-solid mpg-border-orange-500'
        >
            <ActiveMouse cNode={cNode} className='mpg-h-full'>
                <ActiveDropAsChild cNode={cNode} className='mpg-h-full'>
                    {children}
                </ActiveDropAsChild>
            </ActiveMouse>
        </div>
    )
}