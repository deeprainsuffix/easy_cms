import React from 'react';
import type { Root_cNode } from './Root_cNode';
interface I_Props {
    cNode: Root_cNode;
    children: JSX.Element;
}
export function Root_active(props: I_Props) {
    const { cNode, children } = props;
    return (
        <div id={String(cNode.id)}>
            我是树根{cNode.id}
            {children}
        </div>
    )
}