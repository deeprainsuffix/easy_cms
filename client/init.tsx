import React, { useRef, useState } from 'react';

const node1: any = {
    id: 1,
    num: 1,
    children: [],
};
const node2 = {
    id: 2,
    num: 2,
    children: [],
};
const node3 = {
    id: 3,
    num: 3,
    children: [],
};
node1.children.push(node2, node3);

(window as any).testN1 = node1;
(window as any).testN2 = node2;
(window as any).testN3 = node3;

function NodeTree({ root }: any) {
    return <Node node={root} />
}

function Node({ node }: any) {
    console.log(`node${node.id}渲染`);
    const ref = useRef(node);
    const [r, sR] = useState(0);
    ref.current.rerender = () => sR(r => { console.log('这个数没用r:', r); return r + 1 });

    return (
        <div>
            <div>展示: {node.num}</div>
            {
                node.children.length
                    ?
                    node.children.map((n: any) => <Node key={n.id} node={n} />)
                    :
                    null
            }
        </div>
    )
}

export default <NodeTree root={node1} />