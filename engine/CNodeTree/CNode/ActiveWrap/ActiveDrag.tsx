import React, { type DragEventHandler, useCallback } from 'react';
import { ActionCNode_type_move } from '@/engine/ActionController/ActiocCNode';
import { CNode } from '..';

interface I_ActiveDrag extends React.InputHTMLAttributes<HTMLDivElement> {
    cNode: CNode;
}

export function ActiveDrag(props: I_ActiveDrag) {
    const { cNode, children, className } = props;
    const onDragStart = useCallback<DragEventHandler>((e) => {
        e.dataTransfer.setData('type', ActionCNode_type_move);
        e.dataTransfer.setData('id', cNode.id);
        e.dataTransfer.setData('moveFromParentId', cNode.parent!.id);
        e.dataTransfer.setData('moveFromPos', String(cNode.pos));
        e.stopPropagation();
    }, []);

    return (
        <div className={className} draggable onDragStart={onDragStart}>
            {children}
        </div>
    )
}