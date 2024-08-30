import { useCallback } from "react";
import { actionController } from '@/engine/ActionController';
import { ActionCNodeProps_type_update } from '@/engine/ActionController/ActionCNodeProps';
import type { T_CNode } from "../index.type";
import type { I_SelectSingle } from "@/components/ui_custom/SelectSingle"

export function useSelectSingleOnChange<T extends T_CNode>(cNode: T, prop: keyof T['props']) {
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