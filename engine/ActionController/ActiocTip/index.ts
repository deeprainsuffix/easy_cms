/**
 * 生成新节点
 */
export const ActionTip_type_select = 'select';
export interface I_ActionTip_select {
    type: typeof ActionTip_type_select;
    id: string;
}

export class ActionTip_select implements I_ActionTip_select {
    type: typeof ActionTip_type_select;
    constructor(
        public id: string,
    ) {
        this.type = ActionTip_type_select;
    }
}