import { useCallback } from "react";
import type { CNode } from "..";
import { actionController } from '@/engine/ActionController';
import { ActionCNodeProps_type_update } from '@/engine/ActionController/ActionCNodeProps';
import type { I_CNode_props } from "../index.type";

interface I_useInputOnChange {
    cNode: CNode;
    prop: keyof I_CNode_props;
}

export function useInputOnChange({ cNode, prop }: I_useInputOnChange) {
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        actionController.dispatchAction({
            type: ActionCNodeProps_type_update,
            id: cNode.id,
            prop,
            value: e.target.value,
        });
    }

    return useCallback(onChange, [cNode.id]);
}