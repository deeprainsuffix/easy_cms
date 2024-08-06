import { useCallback } from "react";
import type { CNode } from "..";
import { actionController } from '@/engine/ActionController';
import { ActionCNodeProps_type_update } from '@/engine/ActionController/ActionCNodeProps';
import type { I_CNode_props } from "../type";
import type { I_SelectSingle } from "@/components/ui_custom/SelectSingle"


interface I_useSelectSingleOnChange {
    cNode: CNode;
    prop: keyof I_CNode_props;
}

export function useSelectSingleOnChange({ cNode, prop }: I_useSelectSingleOnChange) {
    const onChange: I_SelectSingle['onValueChange'] = (value) => {
        actionController.dispatchAction({
            type: ActionCNodeProps_type_update,
            id: cNode.id,
            prop,
            value,
        });
    }

    return useCallback(onChange, [cNode.id]);
}