import React from 'react';
import type { Input_CNode } from './Input_CNode';
import { Input } from '@/components/ui/input';
import { CNode_UI_Drag } from '../Wrapper_CNode_UI/CNode_UI_Drag';
import { CNode_UI_DropAsSibling } from '../Wrapper_CNode_UI/CNode_UI_DropAsSibling';
import { CNode_UI_Mouse } from '../Wrapper_CNode_UI/CNode_UI_Mouse';

interface I_Input_CNode_UI {
    cNode: Input_CNode;
}

export function Input_CNode_UI({ cNode }: I_Input_CNode_UI) {
    const props = cNode.props;
    const { fieldLabel, fieldPlaceholder } = props;

    return (
        <div id={cNode.id} ref={cNode.ref}>
            <CNode_UI_Mouse cNode={cNode}>
                <CNode_UI_DropAsSibling cNode={cNode}>
                    <CNode_UI_Drag cNode={cNode}>
                        <div className='mpg-flex'>
                            <div className='mpg-flex-grow-0 mpg-flex-shrink-0 mpg-w-24 mpg-flex mpg-justify-center mpg-items-center'>{fieldLabel}</div>
                            <div className='mpg-flex-grow-0 mpg-flex-shrink-0 mpg-w-48'>
                                <Input placeholder={fieldPlaceholder} />
                            </div>
                        </div>
                    </CNode_UI_Drag>
                </CNode_UI_DropAsSibling>
            </CNode_UI_Mouse>
        </div>
    )
}