import React from 'react';
import type { Root_cNode } from './Root_cNode';
import { ActiveDropAsChild } from '../ActiveWrap/ActiveDropAsChild';

interface I_Root_active {
    cNode: Root_cNode;
    children: React.ReactNode[];
}
export function Root_active(props: I_Root_active) {
    const { cNode, children } = props;

    return (
        <ActiveDropAsChild cNode={cNode} className='mpg-h-full'>
            <div id={cNode.id} className='mpg-h-full mpg-border-8 mpg-border-solid mpg-border-orange-500'>
                {children}
            </div>
        </ActiveDropAsChild>
    )
}