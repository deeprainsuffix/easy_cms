import { actionController } from '@/engine/ActionController';
import { ActionCNode_type_add, ActionCNode_type_move } from '@/engine/ActionController/ActionCNode';
import { DragEventHandler, useCallback } from 'react';
import type { T_CNode_Concrete, T_ComponentName } from '../index.type';
import { ActionTip_type_dropTarget_none, ActionTip_type_dropTarget_update } from '@/engine/ActionController/ActionTip';

export function useCNode_UI_DropAsChild(cNode: T_CNode_Concrete) {
    const onDragEnter = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();
    }, []);

    const onDragOver = useCallback<DragEventHandler>((e) => {
        if (!cNode.isDropTarget) {
            actionController.dispatchAction({
                type: ActionTip_type_dropTarget_update,
                id: cNode.id,
            });
        }

        e.stopPropagation();
        e.preventDefault();
    }, []);

    const onDrop = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();

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

        // https://bugzilla.mozilla.org/show_bug.cgi?id=460801
        // 移动节点到不同的dom中，原节点删除，dragend不触发，所以必须在drop中补充此逻辑
        // useCNode_UI_DropAsSibling中也加上
        actionController.dispatchAction({
            type: ActionTip_type_dropTarget_none,
        });
    }, []);

    return { onDragEnter, onDragOver, onDrop }
}