import React from 'react';
import type { Select_CNode } from './Select_CNode';
import { useCNode_UI_Drag } from '../useCNode_UI/useCNode_UI.Drag';
import { useCNode_UI_DropAsSibling } from '../useCNode_UI/useCNode_UI.DropAsSibling';
import { WrapperDropAsSibling } from '../useCNode_UI/Wrapper.DropAsSibling';
import { useCNode_UI_Mouse } from '../useCNode_UI/useCNode_UI.Mouse';
import { Select } from '@/components/ui_CNode/Select';

interface I_Select_CNode_UI {
    cNode: Select_CNode;
}

export function Select_CNode_UI({ cNode }: I_Select_CNode_UI) {
    const props = cNode.props;

    const { onClick } = useCNode_UI_Mouse(cNode);
    const { onDragEnter, onDragOver, onDrop, dropLeftRef } = useCNode_UI_DropAsSibling(cNode);
    const { onDragStart, onDragEnd } = useCNode_UI_Drag(cNode);

    return (
        <div
            id={cNode.id} ref={cNode.ref}
            className='w-full max-w-[300px] bg-s200 relative'
            onClick={onClick}
            onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop}
            onDragStart={onDragStart} draggable onDragEnd={onDragEnd}
        >
            <Select props={{ ...props }} />
            <WrapperDropAsSibling isDropTarget={cNode.isDropTarget} isDropLeft={dropLeftRef.current} />
        </div>
    )
}