import React, { type DragEventHandler, useCallback } from 'react';
import { type T_ComponentName } from '../type';
import { ActionCNode_type_add } from '@/engine/ActionController/ActiocCNode';

interface I_ActiveBeforeDrag extends React.InputHTMLAttributes<HTMLDivElement> {
    componentName: T_ComponentName;
}

export function ActiveBeforeDrag(props: I_ActiveBeforeDrag) {
    const { componentName, children, className } = props;
    const onDragStart = useCallback<DragEventHandler>((e) => {
        e.dataTransfer.setData('type', ActionCNode_type_add);
        e.dataTransfer.setData('componentName', componentName);
        e.stopPropagation();
    }, [componentName]);

    return (
        <div className={className} draggable onDragStart={onDragStart}>
            {children}
        </div>
    )
}