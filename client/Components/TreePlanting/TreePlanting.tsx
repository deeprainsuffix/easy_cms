import React, { useEffect, useState } from 'react';
import type { CNode } from '../../../engine/CNodeTree/CNode';

export default function TreePlanting({ cNode }: { cNode: CNode }) {
    const ReactComponentFuncActive = cNode.ReactComponentFuncActive;

    const [_, setState] = useState(0);
    useEffect(() => {
        cNode.render = () => setState(_ => _ + 1);
    }, []);

    return (
        <ReactComponentFuncActive cNode={cNode}>
            {cNode.children.map(cNode_child => cNode_child && <TreePlanting key={cNode_child.id} cNode={cNode_child} />)}
        </ReactComponentFuncActive>
    )
}