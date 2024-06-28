import React from 'react';
import { createRoot } from 'react-dom/client';
import TreePlanting from './TreePlanting';
import type { CNode } from '../engine/NodeTree/CNode';

const rootDom = document.createElement('div');
rootDom.setAttribute('id', 'root');
document.body.appendChild(rootDom);

const rootReact = createRoot(rootDom);

export function testRender(cNode: CNode) { // todelete
    console.log('节点树', cNode);
    rootReact.render(
        <TreePlanting cNode={cNode} />
    );
}
