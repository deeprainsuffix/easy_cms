import React from 'react';
import { createRoot } from 'react-dom/client';
import { Ctx } from './Ctx';
import './Styles/global.css';
import { Page_Router } from './Pages/Page_Router';
import type { Root_CNode } from '@/engine/CNodeTree/CNode/Foundation/Root_CNode';

const rootDom = document.createElement('div');
rootDom.setAttribute('id', 'root');
document.body.appendChild(rootDom);

const rootReact = createRoot(rootDom);
export function pageRender(cNodeRoot: Root_CNode) { // todelete
    rootReact.render(
        <Ctx.Provider value={{ cNodeRoot }}>
            <Page_Router />
        </Ctx.Provider>
    );
}