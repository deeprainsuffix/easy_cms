import React, { type DragEventHandler, useCallback } from 'react';
import { type T_ComponentName } from '../index.type';
import { actionController } from '@/engine/ActionController';
import { ActionCNode_type_add } from '@/engine/ActionController/ActionCNode';
import { ActionTip_type_select_none } from '@/engine/ActionController/ActionTip';

interface I_CNode_UI_Left_Drag extends React.InputHTMLAttributes<HTMLDivElement> {
    componentName: T_ComponentName;
}

export function CNode_UI_Left_Drag(props: I_CNode_UI_Left_Drag) {
    const { componentName, children, className } = props;
    const onDragStart = useCallback<DragEventHandler>((e) => {
        e.dataTransfer.setData('type', ActionCNode_type_add);
        e.dataTransfer.setData('componentName', componentName);
        e.stopPropagation();
        actionController.dispatchAction({
            type: ActionTip_type_select_none,
        });
    }, [componentName]);

    return (
        <div className={className} draggable onDragStart={onDragStart}>
            {children}
        </div>
    )
}