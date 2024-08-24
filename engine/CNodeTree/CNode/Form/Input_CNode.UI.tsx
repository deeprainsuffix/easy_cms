import React from 'react';
import type { Input_CNode } from './Input_CNode';
import { CNode_UI_Drag } from '../Wrapper_CNode_UI/CNode_UI_Drag';
import { CNode_UI_DropAsSibling } from '../Wrapper_CNode_UI/CNode_UI_DropAsSibling';
import { CNode_UI_Mouse } from '../Wrapper_CNode_UI/CNode_UI_Mouse';
import { Input } from '@/components/ui_CNode/Input';

interface I_Input_CNode_UI {
    cNode: Input_CNode;
}

export function Input_CNode_UI({ cNode }: I_Input_CNode_UI) {
    const props = cNode.props;

    return (
        <div id={cNode.id} ref={cNode.ref} className='w-full max-w-[300px] bg-s200'>
            <CNode_UI_Mouse cNode={cNode}>
                <CNode_UI_DropAsSibling cNode={cNode}>
                    <CNode_UI_Drag cNode={cNode}>
                        <Input props={{ ...props }} />
                    </CNode_UI_Drag>
                </CNode_UI_DropAsSibling>
            </CNode_UI_Mouse>
        </div>
    )
}