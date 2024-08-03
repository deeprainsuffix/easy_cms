import React from 'react';
import type { Input_CNode } from './Input_CNode';
import { Input } from '@/components/ui/input';
import { CNode_UI_Drag } from '../Wrapper_CNode_UI/CNode_UI_Drag';
import { CNode_UI_DropAsSibling } from '../Wrapper_CNode_UI/CNode_UI_DropAsSibling';
import { CNode_UI_Mouse } from '../Wrapper_CNode_UI/CNode_UI_Mouse';

interface I_Input_CNode_UI {
    cNode: Input_CNode;
}

export function Input_CNode_UI(props: I_Input_CNode_UI) {
    const { cNode } = props;

    return (
        <div id={cNode.id} ref={cNode.ref}>
            <CNode_UI_Mouse cNode={cNode}>
                <CNode_UI_DropAsSibling cNode={cNode}>
                    <CNode_UI_Drag cNode={cNode}>
                        <Input placeholder={`输入框${cNode.id}`} />
                    </CNode_UI_Drag>
                </CNode_UI_DropAsSibling>
            </CNode_UI_Mouse>
        </div>
    )
}