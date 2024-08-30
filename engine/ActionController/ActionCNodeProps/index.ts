import type { I_CNode, T_CNode } from "@/engine/CNodeTree/CNode/index.type";

/**
 * 更新节点某个属性值
 */
export const ActionCNodeProps_type_update = 'props_update';
export interface I_ActionCNodeProps_update {
    type: typeof ActionCNodeProps_type_update;
    id: string;
    prop: keyof I_CNode['props']; // todo 其实应该改成T_CNode['props']，能够从调用方判断出prop
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