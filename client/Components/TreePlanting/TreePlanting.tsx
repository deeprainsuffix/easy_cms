import React, { useEffect, useState } from 'react';
import { lifeCycle_afterDomMounted, type CNode } from '../../../engine/CNodeTree/CNode';

export default function TreePlanting({ cNode }: { cNode: CNode }) {
    const CNode_UI = cNode.CNode_UI;

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
        <CNode_UI cNode={cNode}>
            {cNode.children.filter((c): c is CNode => c !== null).map(cNode_child => <TreePlanting key={cNode_child.id} cNode={cNode_child} />)}
        </CNode_UI>
    )
}