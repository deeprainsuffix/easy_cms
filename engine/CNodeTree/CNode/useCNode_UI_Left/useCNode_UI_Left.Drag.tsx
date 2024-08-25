import { type DragEventHandler, useCallback } from 'react';
import { type T_ComponentName } from '../index.type';
import { actionController } from '@/engine/ActionController';
import { ActionCNode_type_add } from '@/engine/ActionController/ActionCNode';
import { ActionTip_type_select_none } from '@/engine/ActionController/ActionTip';

export function useCNode_UI_Left_Drag(componentName: T_ComponentName) {
    const onDragStart = useCallback<DragEventHandler>((e) => {
        e.dataTransfer.setData('type', ActionCNode_type_add);
        e.dataTransfer.setData('componentName', componentName);
        e.stopPropagation();
        actionController.dispatchAction({
            type: ActionTip_type_select_none,
        });
    }, [componentName]);

    return { onDragStart }
}