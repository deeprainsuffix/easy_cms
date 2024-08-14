import React from 'react';
import { createRoot } from 'react-dom/client';
import type { CNode } from '../engine/CNodeTree/CNode';
import { Ctx } from './Ctx';
import './Styles/global.css';
import { Page_Router } from './Pages/Page_Router';

const rootDom = document.createElement('div');
rootDom.setAttribute('id', 'root');
document.body.appendChild(rootDom);

const rootReact = createRoot(rootDom);
export function testRender(cNodeRoot: CNode) { // todelete
    console.log('节点树', cNodeRoot);

    rootReact.render(
        <Ctx.Provider value={{ cNodeRoot }}>
            <Page_Router />
        </Ctx.Provider>
    );
}