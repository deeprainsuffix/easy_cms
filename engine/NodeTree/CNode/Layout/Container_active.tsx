import React from 'react';
import type { Container_cNode } from './container_cNode';
interface I_Props {
    cNode: Container_cNode;
}
export function Container_active(props: I_Props) {
    const { cNode } = props;
    return (
        <div id={String(cNode.id)}>
            我是容器{cNode.id}
        </div>
    )
}