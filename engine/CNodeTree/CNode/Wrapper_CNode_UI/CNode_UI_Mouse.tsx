import React, { type MouseEventHandler, useCallback } from 'react';
import { CNode } from '..';
import { actionController } from '@/engine/ActionController';
import { ActionTip_type_select } from '@/engine/ActionController/ActiocTip';

interface I_CNode_UI_Mouse extends React.InputHTMLAttributes<HTMLDivElement> {
    cNode: CNode;
}

export function CNode_UI_Mouse(props: I_CNode_UI_Mouse) {
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