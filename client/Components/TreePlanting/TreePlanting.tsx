import React, { useEffect, useState } from 'react';
import { lifeCycle_afterDomMounted, type CNode } from '../../../engine/CNodeTree/CNode';

export default function TreePlanting({ cNode }: { cNode: CNode }) {
    const ReactComponentFuncActive = cNode.ReactComponentFuncActive;

    const [renderPoint, setState] = useState(0);
    useEffect(() => {
        cNode.render = () => setState(renderPoint => renderPoint + 1);
    }, []);

    useEffect(() => {
        if (renderPoint === 0) {
            cNode.lifeCycleRun(lifeCycle_afterDomMounted);
        }
    }, [renderPoint]);

    return (
        <ReactComponentFuncActive cNode={cNode}>
            {cNode.children.map(cNode_child => cNode_child && <TreePlanting key={cNode_child.id} cNode={cNode_child} />)}
        </ReactComponentFuncActive>
    )
}