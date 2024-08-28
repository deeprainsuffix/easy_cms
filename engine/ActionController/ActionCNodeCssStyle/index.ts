import type { I_CNode_Concrete } from "@/engine/CNodeTree/CNode/index.type";

/**
 * 更新cssStyle
 */
export const ActionCNodeCssStyle_type_update = 'css_style_update';
export interface I_ActionCNodeCssStyle_update {
    type: typeof ActionCNodeCssStyle_type_update;
    id: string;
    cssStyle: I_CNode_Concrete['cssStyle'];
}
export class ActionCNodeCssStyle_update implements I_ActionCNodeCssStyle_update {
    type: I_ActionCNodeCssStyle_update['type'];

    constructor(
        public id: I_ActionCNodeCssStyle_update['id'],
        public cssStyle: I_ActionCNodeCssStyle_update['cssStyle'],
    ) {
        this.type = ActionCNodeCssStyle_type_update;
    }
}


export type T_ActionCNodeCssStyle_Required =
    I_ActionCNodeCssStyle_update
    ;


export type T_ActionCNodeCssStyle =
    ActionCNodeCssStyle_update
    ;

export const ActionCNodeCssStyle_collection = {
    [ActionCNodeCssStyle_type_update]: ActionCNodeCssStyle_update,
}