import { type DragEventHandler, useCallback } from 'react';
import type { T_CNode } from '../index.type';
import { actionController } from '@/engine/ActionController';
import { ActionCNode_type_add } from '@/engine/ActionController/ActionCNode';
import { ActionTip_type_drag_start, ActionTip_type_dropTarget_none, ActionTip_type_select_none } from '@/engine/ActionController/ActionTip';

export function useCNode_UI_Left_Drag(componentName: T_CNode['componentName'], componentCategory: T_CNode['componentCategory']) {
    const onDragStart = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        // e.preventDefault();

        e.dataTransfer.setData('type', ActionCNode_type_add);
        e.dataTransfer.setData('componentName', componentName);
        actionController.dispatchAction({
            type: ActionTip_type_select_none,
        });
        actionController.dispatchAction({
            type: ActionTip_type_drag_start,
            componentName,
            componentCategory,
        });
    }, [componentName]);

    const onDragEnd = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();

        actionController.dispatchAction({
            type: ActionTip_type_dropTarget_none,
        });
    }, []);

    return { onDragStart, onDragEnd }
}