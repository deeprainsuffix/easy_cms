import React, { useEffect, useState } from 'react';
import { lifeCycle_afterDomMounted, lifeCycle_afterDomUpdated } from '../../../engine/CNodeTree/CNode';
import { T_CNode } from '@/engine/CNodeTree/CNode/index.type';

export function TreePlanting({ cNode }: { cNode: T_CNode }) {
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

    useEffect(() => {
        if (renderPoint > 0) {
            cNode.lifeCycleRun(lifeCycle_afterDomUpdated);
        }
    }, [renderPoint]);

    return (
        // @ts-ignore 程序保证CNode对应
        <CNode_UI cNode={cNode}>
            {cNode.children.filter((c): c is T_CNode => c !== null).map(cNode_child => <TreePlanting key={cNode_child.id} cNode={cNode_child} />)}
        </CNode_UI>
    )
}