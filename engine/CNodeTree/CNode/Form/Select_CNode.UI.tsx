import React, { useCallback } from 'react';
import type { Select_CNode } from './Select_CNode';
import { useCNode_UI_Drag } from '../useCNode_UI/useCNode_UI.Drag';
import { T_condition_dropAsSibling, useCNode_UI_DropAsSibling } from '../useCNode_UI/useCNode_UI.DropAsSibling';
import { WrapperDropAsSibling } from '../useCNode_UI/Wrapper.DropAsSibling';
import { useCNode_UI_Mouse } from '../useCNode_UI/useCNode_UI.Mouse';
import { Select } from '@/components/ui_CNode/Select';

interface I_Select_CNode_UI {
    cNode: Select_CNode;
}

export function Select_CNode_UI({ cNode }: I_Select_CNode_UI) {
    const { props, cssStyle } = cNode;

    const { onClick } = useCNode_UI_Mouse(cNode);
    const condition_drop = useCallback<T_condition_dropAsSibling>((componentName, componentCategory) => {
        if (componentCategory === 'form') {
            return true
        }

        return false
    }, []);
    const { onDragEnter, onDragOver, onDrop, canDrop, dropLeftRef } = useCNode_UI_DropAsSibling(cNode, condition_drop);
    const { onDragStart, onDragEnd } = useCNode_UI_Drag(cNode);

    return (
        <div
            id={cNode.id} ref={cNode.ref}
            style={{ ...cssStyle }}
            className='max-w-[300px] bg-s200 relative'
            onClick={onClick}
            onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop}
            onDragStart={onDragStart} draggable onDragEnd={onDragEnd}
        >
            <Select props={{ ...props }} />
            <WrapperDropAsSibling isDropTarget={cNode.isDropTarget} canDrop={canDrop.current.value} isDropLeft={dropLeftRef.current} />
        </div>
    )
}