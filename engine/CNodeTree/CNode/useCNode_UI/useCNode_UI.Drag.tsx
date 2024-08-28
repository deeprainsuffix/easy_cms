import { type DragEventHandler, useCallback } from 'react';
import { ActionCNode_type_move } from '@/engine/ActionController/ActionCNode';
import { actionController } from '@/engine/ActionController';
import { ActionTip_type_drag_start, ActionTip_type_dropTarget_none, ActionTip_type_select_none } from '@/engine/ActionController/ActionTip';
import type { T_CNode_Concrete } from '../index.type';

export function useCNode_UI_Drag(cNode: T_CNode_Concrete) {
    const onDragStart = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        // e.preventDefault();

        e.dataTransfer.setData('type', ActionCNode_type_move);
        e.dataTransfer.setData('id', cNode.id);
        e.dataTransfer.setData('moveFromParentId', cNode.parent!.id);
        e.dataTransfer.setData('moveFromPos', String(cNode.pos));
        actionController.dispatchAction({
            type: ActionTip_type_select_none,
        });
        actionController.dispatchAction({
            type: ActionTip_type_drag_start,
            componentName: cNode.componentName,
            componentCategory: cNode.componentCategory,
        });
    }, []);

    const onDragEnd = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();

        actionController.dispatchAction({
            type: ActionTip_type_dropTarget_none,
        });
    }, []);

    return { onDragStart, onDragEnd }
}