import React from 'react';
import type { Input_cNode } from './Input_cNode';
interface I_Props {
    cNode: Input_cNode;
}
export function Input_active(props: I_Props) {
    const { cNode } = props;
    return (
        <div id={String(cNode.id)}>
            我是容器{cNode.id}
        </div>
    )
}