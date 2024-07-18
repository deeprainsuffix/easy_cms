/**
 * 选中节点
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

/**
 * 不选中任何节点，与ActionTip_type_select相对
 */
export const ActionTip_type_select_none = 'select_none';
export interface I_ActionTip_select_none {
    type: typeof ActionTip_type_select_none;
}

export class ActionTip_select_none implements I_ActionTip_select_none {
    type: typeof ActionTip_type_select_none;
    constructor(
    ) {
        this.type = ActionTip_type_select_none;
    }
}

/**
 * *********************************************************************************************************
 * *********************************************************************************************************
 */

export type T_ActionTip_Props =
    I_ActionTip_select |
    I_ActionTip_select_none
    ;

export type T_ActionTip =
    ActionTip_select |
    ActionTip_select_none
    ;

/**
 * *********************************************************************************************************
 * *********************************************************************************************************
 */

export const ActionTip_collection = {
    [ActionTip_type_select]: ActionTip_select,
    [ActionTip_type_select_none]: ActionTip_select_none,
}