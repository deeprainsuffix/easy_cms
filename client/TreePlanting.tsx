import React from 'react';
import type { CNode } from '../engine/NodeTree/CNode';

export default function TreePlanting({ cNode }: { cNode: CNode }) {
    const ReactComponentFunc = cNode.ReactComponentFunc;
    return (
        <ReactComponentFunc
            cNode={cNode}
            children={cNode.children.map(cNode_child => <TreePlanting key={cNode_child.id} cNode={cNode_child} />)}
        />
    )
}