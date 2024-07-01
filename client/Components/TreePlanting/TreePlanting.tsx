import React from 'react';
import type { CNode } from '../../../engine/CNodeTree/CNode';

export default function TreePlanting({ cNodeRoot }: { cNodeRoot: CNode }) {
    const ReactComponentFunc = cNodeRoot.ReactComponentFunc;
    return (
        <ReactComponentFunc
            cNode={cNodeRoot}
            children={cNodeRoot.children.map(cNode_child => <TreePlanting key={cNode_child.id} cNodeRoot={cNode_child} />)}
        />
    )
}