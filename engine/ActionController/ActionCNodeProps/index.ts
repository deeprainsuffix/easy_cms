import { type I_CNode_props } from "@/engine/CNodeTree/CNode/index.type";

/**
 * 选中节点
 */
export const ActionCNodeProps_type_update = 'update';
export interface I_ActionCNodeProps_update {
    type: typeof ActionCNodeProps_type_update;
    id: string;
    prop: keyof I_CNode_props; // todo 这里值来自节点的key
    value: any;
}
export class ActionCNodeProps_update implements I_ActionCNodeProps_update {
    type: I_ActionCNodeProps_update['type'];

    constructor(
        public id: I_ActionCNodeProps_update['id'],
        public prop: I_ActionCNodeProps_update['prop'],
        public value: I_ActionCNodeProps_update['value'],
    ) {
        this.type = ActionCNodeProps_type_update;
    }
}


export type T_ActionCNodeProps_Required =
    I_ActionCNodeProps_update
    ;


export type T_ActionCNodeProps =
    ActionCNodeProps_update
    ;

export const ActionCNodeProps_collection = {
    [ActionCNodeProps_type_update]: ActionCNodeProps_update,
}