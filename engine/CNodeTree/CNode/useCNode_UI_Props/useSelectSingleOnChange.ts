import { useCallback } from "react";
import { actionController } from '@/engine/ActionController';
import { ActionCNodeProps_type_update } from '@/engine/ActionController/ActionCNodeProps';
import type { I_CNode_props, T_CNode } from "../index.type";
import type { I_SelectSingle } from "@/components/ui_custom/SelectSingle"

export function useSelectSingleOnChange(cNode: T_CNode, prop: keyof I_CNode_props) {
    const onChange = useCallback<NonNullable<I_SelectSingle['onValueChange']>>((value) => {
        actionController.dispatchAction({
            type: ActionCNodeProps_type_update,
            id: cNode.id,
            prop,
            value,
        });
    }, [cNode.id]);

    return { onChange }
}