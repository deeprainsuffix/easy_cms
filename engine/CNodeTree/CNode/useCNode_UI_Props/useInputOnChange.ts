import { useCallback } from "react";
import { actionController } from '@/engine/ActionController';
import { ActionCNodeProps_type_update } from '@/engine/ActionController/ActionCNodeProps';
import type { I_CNode_props, T_CNode } from "../index.type";

export function useInputOnChange(cNode: T_CNode, prop: keyof I_CNode_props) {
    const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        actionController.dispatchAction({
            type: ActionCNodeProps_type_update,
            id: cNode.id,
            prop,
            value: e.target.value,
        });
    }, [cNode.id]);

    return { onChange }
}