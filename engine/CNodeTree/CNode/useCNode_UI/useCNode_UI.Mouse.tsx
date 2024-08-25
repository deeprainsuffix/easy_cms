import { type MouseEventHandler, useCallback } from 'react';
import { actionController } from '@/engine/ActionController';
import { ActionTip_type_select } from '@/engine/ActionController/ActionTip';
import type { T_CNode_Concrete } from '../index.type';

interface T_option {
    enablePropagation?: boolean;
    enablePrevent?: boolean;
}

export function useCNode_UI_Mouse(
    cNode: T_CNode_Concrete,
    option: T_option = { enablePropagation: false, enablePrevent: false }
) {
    const { enablePropagation, enablePrevent } = option;
    const onClick = useCallback<MouseEventHandler>((e) => {
        !enablePropagation && e.stopPropagation();
        !enablePrevent && e.preventDefault();
        actionController.dispatchAction({
            type: ActionTip_type_select,
            id: cNode.id,
        });
    }, []);

    return { onClick }
}