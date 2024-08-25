import { actionController } from '@/engine/ActionController';
import { ActionCNode_type_add, ActionCNode_type_move } from '@/engine/ActionController/ActionCNode';
import React, { DragEventHandler, useCallback } from 'react';
import type { T_CNode_Concrete, T_ComponentName } from '../index.type';


export function useCNode_UI_DropAsChild(cNode: T_CNode_Concrete) {
    const onDragEnter = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();
        // todo
    }, []);

    const onDragOver = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();
    }, []);

    const onDrop = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        const type = e.dataTransfer.getData('type');
        switch (type) {
            case ActionCNode_type_add:
                const componentName = e.dataTransfer.getData('componentName') as T_ComponentName;
                actionController.dispatchAction({
                    type,
                    componentName: componentName,
                    parentId: cNode.id,
                    pos: cNode.children.length,
                });
                break;
            case ActionCNode_type_move:
                const id = e.dataTransfer.getData('id') as T_ComponentName;
                const moveFromParentId = e.dataTransfer.getData('moveFromParentId');
                const moveFromPos = +e.dataTransfer.getData('moveFromPos');
                actionController.dispatchAction({
                    type,
                    id,
                    moveFromParentId,
                    moveFromPos,
                    moveToParentId: cNode.id,
                    moveToPos: cNode.children.length,
                });
                break;
            default:
                console.error('CNode_UI_DropAsChild中未处理的action type:', type);
        }

        e.preventDefault();
    }, []);

    return { onDragEnter, onDragOver, onDrop }
}