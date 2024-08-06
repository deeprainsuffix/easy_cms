import React, { type DragEventHandler, useCallback } from 'react';
import { ActionCNode_type_move } from '@/engine/ActionController/ActionCNode';
import { CNode } from '..';
import { actionController } from '@/engine/ActionController';
import { ActionTip_type_select_none } from '@/engine/ActionController/ActionTip';

interface I_CNode_UI_Drag extends React.InputHTMLAttributes<HTMLDivElement> {
    cNode: CNode;
}

export function CNode_UI_Drag(props: I_CNode_UI_Drag) {
    const { cNode, children, className } = props;
    const onDragStart = useCallback<DragEventHandler>((e) => {
        e.dataTransfer.setData('type', ActionCNode_type_move);
        e.dataTransfer.setData('id', cNode.id);
        e.dataTransfer.setData('moveFromParentId', cNode.parent!.id);
        e.dataTransfer.setData('moveFromPos', String(cNode.pos));
        e.stopPropagation();
        actionController.dispatchAction({
            type: ActionTip_type_select_none,
        });
    }, []);

    return (
        <div className={className} draggable onDragStart={onDragStart}>
            {children}
        </div>
    )
}