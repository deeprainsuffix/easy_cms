import { actionController } from '@/engine/ActionController';
import { ActionCNode_type_add, ActionCNode_type_move } from '@/engine/ActionController/ActionCNode';
import React, { DragEventHandler, useCallback, useRef } from 'react';
import { type T_ComponentName } from '../type';
import { type CNode } from '..';

interface I_CNode_UI_DropAsSibling extends React.InputHTMLAttributes<HTMLDivElement> {
    cNode: CNode;
}

export function CNode_UI_DropAsSibling(props: I_CNode_UI_DropAsSibling) {
    const { cNode, children, className } = props;

    const rectRef = useRef<DOMRect>();
    const dropLeftRef = useRef<boolean>(true); // isDropIn = false时使用

    const onDragEnter = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();
        // todo
        rectRef.current = e.currentTarget.getBoundingClientRect();
    }, []);
    const onDragOver = useCallback<DragEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();
        const { clientX, clientY } = e;
        const { height, width, left, bottom } = rectRef.current!;
        const dropLeft = clientY <= (-height / width) * (clientX - left) + bottom;
        dropLeftRef.current = dropLeft;
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
                    parentId: cNode.parent!.id,
                    pos: dropLeftRef.current ? cNode.pos : cNode.pos + 1,
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
                    moveToParentId: cNode.parent!.id,
                    moveToPos: dropLeftRef.current ? cNode.pos : cNode.pos + 1,
                });
                break;
            default:
                console.error('CNode_UI_DropAsSibling中未处理的action type:', type);
        }

        e.preventDefault();
    }, []);

    return (
        <div className={className} onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop}>
            {children}
        </div>
    )
}