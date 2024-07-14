import { actionController } from '@/engine/ActionController';
import { ActionCNode_type_add, ActionCNode_type_move } from '@/engine/ActionController/ActiocCNode';
import React, { DragEventHandler, useCallback } from 'react';
import { type T_ComponentName } from '../type';
import { type CNode } from '..';

interface I_ActiveDropAsChild extends React.InputHTMLAttributes<HTMLDivElement> {
    cNode: CNode;
}

export function ActiveDropAsChild(props: I_ActiveDropAsChild) {
    const { cNode, children, className } = props;

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
                console.error('ActiveDrop中未处理的action type:', type);
        }

        e.preventDefault();
    }, []);

    return (
        <div className={className} onDragOver={onDragOver} onDrop={onDrop}>
            {children}
        </div>
    )
}