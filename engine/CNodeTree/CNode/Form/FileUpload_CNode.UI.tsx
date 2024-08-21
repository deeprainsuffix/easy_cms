import React from 'react';
import type { FileUpload_CNode } from './FileUpload_CNode';
import { CNode_UI_Drag } from '../Wrapper_CNode_UI/CNode_UI_Drag';
import { CNode_UI_DropAsSibling } from '../Wrapper_CNode_UI/CNode_UI_DropAsSibling';
import { CNode_UI_Mouse } from '../Wrapper_CNode_UI/CNode_UI_Mouse';
import { FileUpload_gen } from '@/components/ui_CNode/FileUpload';


interface I_FileUpload_CNode_UI {
    cNode: FileUpload_CNode;
}

export function FileUpload_CNode_UI({ cNode }: I_FileUpload_CNode_UI) {
    const props = cNode.props;
    const { fieldLabel, fieldPlaceholder } = props;

    return (
        <div id={cNode.id} ref={cNode.ref} className='mpg-w-full mpg-max-w-[300px] mpg-bg-s200'>
            <CNode_UI_Mouse cNode={cNode} enablePrevent>
                <CNode_UI_DropAsSibling cNode={cNode}>
                    <CNode_UI_Drag cNode={cNode}>
                        <FileUpload_gen props={{ ...props }} />
                    </CNode_UI_Drag>
                </CNode_UI_DropAsSibling>
            </CNode_UI_Mouse>
        </div>
    )
}