import { actionController } from '@/engine/ActionController';
import { ActionCNode_type_add, ActionCNode_type_move, ActionCNode_type_move_sibling } from '@/engine/ActionController/ActionCNode';
import { DragEventHandler, useCallback, useRef } from 'react';
import type { T_CNode } from '../index.type';
import { ActionTip_type_dropTarget_none, ActionTip_type_dropTarget_update } from '@/engine/ActionController/ActionTip';
import { cNodeTree } from '../..'; // todo 其实CNodeTree确实需要承接CNode间通信的功能，并且在之前的实现中已经用到了

export type T_condition_dropAsSibling = (componentName: T_CNode['componentName'] | null, componentCategory: T_CNode['componentCategory'] | null) => boolean;
export function useCNode_UI_DropAsSibling(cNode: T_CNode, condition_drop?: T_condition_dropAsSibling) {
    const rectRef = useRef<DOMRect>();
    const canDrop = useRef({
        value: true,
        checked: false,
    });
    const onDragEnter = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();
        rectRef.current = e.currentTarget.getBoundingClientRect();
        canDrop.current.value = true;
        canDrop.current.checked = false;
    }, []);

    const dropLeftRef = useRef<boolean>(true); // 判断是落在左边还是右边
    const onDragOver = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();

        const { clientX, clientY } = e;
        const { height, width, left, bottom } = rectRef.current!;
        const dropLeft = clientY <= (-height / width) * (clientX - left) + bottom;
        if (!cNode.isDropTarget || dropLeft !== dropLeftRef.current) {
            dropLeftRef.current = dropLeft;
            actionController.dispatchAction({
                type: ActionTip_type_dropTarget_update,
                id: cNode.id,
            });
        }

        if (!canDrop.current.checked && condition_drop && !condition_drop(cNodeTree.drag_possible.componentName, cNodeTree.drag_possible.componentCategory)) {
            canDrop.current.value = false;
            canDrop.current.checked = true;
        }
        if (canDrop.current.value) {
            e.preventDefault();
        }
    }, []);

    const onDrop = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();

        const type = e.dataTransfer.getData('type');
        switch (type) {
            case ActionCNode_type_add:
                const componentName = e.dataTransfer.getData('componentName') as T_CNode['componentName'];
                actionController.dispatchAction({
                    type,
                    componentName: componentName,
                    parentId: cNode.parent!.id,
                    pos: dropLeftRef.current ? cNode.pos : cNode.pos + 1,
                });
                break;
            case ActionCNode_type_move:
                const id = e.dataTransfer.getData('id') as T_CNode['componentName'];
                const moveFromParentId = e.dataTransfer.getData('moveFromParentId');
                const moveFromPos = +e.dataTransfer.getData('moveFromPos');
                const moveToPos = dropLeftRef.current ? cNode.pos : cNode.pos + 1;
                if (cNode.parent!.id === moveFromParentId) {
                    // 兄弟间move
                    if (id === cNode.id) {
                        return
                    }

                    if (
                        (dropLeftRef.current && moveFromPos + 1 === cNode.pos) ||
                        (!dropLeftRef.current && moveFromPos - 1 === cNode.pos)
                    ) {
                        return
                    }


                    actionController.dispatchAction({
                        type: ActionCNode_type_move_sibling,
                        id,
                        parentId: moveFromParentId,
                        moveFromPos,
                        moveToPos,
                    });
                } else {
                    // 非兄弟间move
                    actionController.dispatchAction({
                        type,
                        id,
                        moveFromParentId,
                        moveFromPos,
                        moveToParentId: cNode.parent!.id,
                        moveToPos,
                    });
                }
                break;
            default:
                console.error('CNode_UI_DropAsSibling中未处理的action type:', type);
        }

        actionController.dispatchAction({
            type: ActionTip_type_dropTarget_none,
        });
    }, []);

    return { onDragEnter, onDragOver, onDrop, canDrop, dropLeftRef }
}