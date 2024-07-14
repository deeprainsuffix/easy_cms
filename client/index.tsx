import React from 'react';
import { createRoot } from 'react-dom/client';
import type { CNode } from '../engine/CNodeTree/CNode';
import PageIndex from './Pages/PageIndex';
import { Ctx } from './Ctx/ctx';
import './Styles/global.css';

const rootDom = document.createElement('div');
rootDom.setAttribute('id', 'root');
document.body.appendChild(rootDom);

const rootReact = createRoot(rootDom);
export function testRender(cNodeRoot: CNode) { // todelete
    console.log('节点树', cNodeRoot);

    rootReact.render(
        <Ctx.Provider value={{ cNodeRoot }}>
            <PageIndex />
        </Ctx.Provider>
    );
}