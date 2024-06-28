import React from 'react';
import type { CNode } from '../engine/NodeTree/CNode';

export default function TreePlanting({ cNode }: { cNode: CNode }) {
    const ReactComponentFunc = cNode.ReactComponentFunc;
    // return (
    //     <ReactComponentFunc
    //         cNode={cNode}
    //         children={cNode.children.map(cNode_child => <TreePlanting key={cNode_child.id} cNode={cNode_child} />)}
    //     />
    // )

    console.log('render begin:', cNode.id);
    const result = <ReactComponentFunc
        cNode={cNode}
        children={cNode.children.map(cNode_child => <TreePlanting key={cNode_child.id} cNode={cNode_child} />)} />
    console.log('上边', cNode.id, result.props.children.length, result.props.children[0]);
    setTimeout(() => {
        console.log('下边', cNode.id, result.props.children.length, result.props.children[0]);
    }, 0);
    console.log('render end:', cNode.id);
    return result
}