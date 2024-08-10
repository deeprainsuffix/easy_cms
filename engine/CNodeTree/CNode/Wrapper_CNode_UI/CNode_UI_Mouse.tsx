import React, { type MouseEventHandler, useCallback } from 'react';
import { CNode } from '..';
import { actionController } from '@/engine/ActionController';
import { ActionTip_type_select } from '@/engine/ActionController/ActionTip';

interface I_CNode_UI_Mouse extends React.InputHTMLAttributes<HTMLDivElement> {
    cNode: CNode;
    enablePropagation?: boolean;
    enablePrevent?: boolean;
}

export function CNode_UI_Mouse(props: I_CNode_UI_Mouse) {
    const {
        cNode, enablePropagation = false, enablePrevent = false,
        children, className
    } = props;
    const onClick = useCallback<MouseEventHandler>((e) => {
        !enablePropagation && e.stopPropagation();
        !enablePrevent && e.preventDefault();
        actionController.dispatchAction({
            type: ActionTip_type_select,
            id: cNode.id,
        });
    }, []);

    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    )
}