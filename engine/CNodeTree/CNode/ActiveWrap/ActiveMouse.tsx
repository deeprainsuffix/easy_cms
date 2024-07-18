import React, { type MouseEventHandler, useCallback } from 'react';
import { CNode } from '..';
import { actionController } from '@/engine/ActionController';
import { ActionTip_type_select } from '@/engine/ActionController/ActiocTip';

interface I_ActiveMouse extends React.InputHTMLAttributes<HTMLDivElement> {
    cNode: CNode;
}

export function ActiveMouse(props: I_ActiveMouse) {
    const { cNode, children, className } = props;
    const onClick = useCallback<MouseEventHandler>((e) => {
        e.stopPropagation();
        e.preventDefault();
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