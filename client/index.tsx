import React from 'react';
import { createRoot } from 'react-dom/client';
import NodeTree from './init'

function App() {
    return (
        <div>
            <div>我是app</div>
            {NodeTree}
        </div>
    )
}

const rootDom = document.createElement('div');
rootDom.setAttribute('id', 'root');
document.body.appendChild(rootDom);

const rootReact = createRoot(rootDom);
rootReact.render(<App />);
