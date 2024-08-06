import React, { type ReactNode } from 'react';
import type { Container_CNode } from './Container_CNode';
import { Container } from '@/components/ui_custom/Container';
import { CNode_UI_Drag } from '../Wrapper_CNode_UI/CNode_UI_Drag';
import { CNode_UI_DropAsChild } from '../Wrapper_CNode_UI/CNode_UI_DropAsChild';
import { CNode_UI_Mouse } from '../Wrapper_CNode_UI/CNode_UI_Mouse';

interface I_Container_CNode_UI {
    cNode: Container_CNode;
    children: React.ReactNode[];
}

export function Container_CNode_UI(props: I_Container_CNode_UI) {
    const { cNode, children } = props;
    const { props: { widthRadio } } = cNode;

    return (
        <div id={cNode.id} ref={cNode.ref}
            style={{ width: widthRadio }}
        >
            <CNode_UI_Mouse cNode={cNode}>
                <CNode_UI_DropAsChild cNode={cNode}>
                    <CNode_UI_Drag cNode={cNode}>
                        <Container cNode={cNode} children={children.length ? children : null} />
                    </CNode_UI_Drag>
                </CNode_UI_DropAsChild >
            </CNode_UI_Mouse>
        </div >
    )
}