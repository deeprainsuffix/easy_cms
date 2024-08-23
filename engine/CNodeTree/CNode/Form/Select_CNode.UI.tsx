import React from 'react';
import type { Select_CNode } from './Select_CNode';
import { CNode_UI_Drag } from '../Wrapper_CNode_UI/CNode_UI_Drag';
import { CNode_UI_DropAsSibling } from '../Wrapper_CNode_UI/CNode_UI_DropAsSibling';
import { CNode_UI_Mouse } from '../Wrapper_CNode_UI/CNode_UI_Mouse';
import { Select_gen } from '@/components/ui_CNode/Select';

interface I_Select_CNode_UI {
    cNode: Select_CNode;
}

export function Select_CNode_UI({ cNode }: I_Select_CNode_UI) {
    const props = cNode.props;
    const { fieldLabel, fieldPlaceholder } = props;

    return (
        <div id={cNode.id} ref={cNode.ref} className='w-full max-w-[300px] bg-s200'>
            <CNode_UI_Mouse cNode={cNode}>
                <CNode_UI_DropAsSibling cNode={cNode}>
                    <CNode_UI_Drag cNode={cNode}>
                        <Select_gen props={{ ...props }} />
                    </CNode_UI_Drag>
                </CNode_UI_DropAsSibling>
            </CNode_UI_Mouse>
        </div>
    )
}