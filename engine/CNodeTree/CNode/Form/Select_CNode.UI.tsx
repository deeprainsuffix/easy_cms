import React from 'react';
import type { Select_CNode } from './Select_CNode';
import { useCNode_UI_Drag } from '../useCNode_UI/useCNode_UI.Drag';
import { useCNode_UI_DropAsSibling } from '../useCNode_UI/useCNode_UI.DropAsSibling';
import { useCNode_UI_Mouse } from '../useCNode_UI/useCNode_UI.Mouse';
import { Select } from '@/components/ui_CNode/Select';

interface I_Select_CNode_UI {
    cNode: Select_CNode;
}

export function Select_CNode_UI({ cNode }: I_Select_CNode_UI) {
    const props = cNode.props;

    const { onClick } = useCNode_UI_Mouse(cNode);
    const { onDragEnter, onDragOver, onDrop } = useCNode_UI_DropAsSibling(cNode);
    const { onDragStart } = useCNode_UI_Drag(cNode);

    return (
        <div id={cNode.id} ref={cNode.ref} className='w-full max-w-[300px] bg-s200'
            onClick={onClick}
            onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop}
            onDragStart={onDragStart} draggable
        >
            <Select props={{ ...props }} />
        </div>
    )
}