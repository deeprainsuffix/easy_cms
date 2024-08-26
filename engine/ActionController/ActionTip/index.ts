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
 * CNodeSticker更新
 */
export const ActionTip_type_select_update = 'select_update';
export interface I_ActionTip_select_update {
    type: typeof ActionTip_type_select_update;
}

export class ActionTip_select_update implements I_ActionTip_select_update {
    type: I_ActionTip_select_update['type'];
    constructor(
    ) {
        this.type = ActionTip_type_select_update;
    }
}

/**
 * 即将出发drop的节点提示
 */
export const ActionTip_type_dropTarget_update = 'dropTarget_update';
export interface I_ActionTip_dropTarget_update {
    type: typeof ActionTip_type_dropTarget_update;
    id: string;
}
export class ActionTip_dropTarget_update implements I_ActionTip_dropTarget_update {
    type: I_ActionTip_dropTarget_update['type'];
    constructor(
        public id: string,
    ) {
        this.type = ActionTip_type_dropTarget_update;
    }
}

/**
 * 取消drop的节点提示，与ActionTip_dropTarget_update相对
 */
export const ActionTip_type_dropTarget_none = 'dropTarget_none';
interface I_ActionTip_dropTarget_none {
    type: typeof ActionTip_type_dropTarget_none;
}
export class ActionTip_dropTarget_none implements I_ActionTip_dropTarget_none {
    type: I_ActionTip_dropTarget_none['type'];
    constructor(
    ) {
        this.type = ActionTip_type_dropTarget_none;
    }
}
/**
 * *********************************************************************************************************
 * *********************************************************************************************************
 */

export type T_ActionTip_Required =
    I_ActionTip_select | I_ActionTip_select_none |
    I_ActionTip_select_update |
    I_ActionTip_dropTarget_update | I_ActionTip_dropTarget_none
    ;

export type T_ActionTip =
    ActionTip_select | ActionTip_select_none |
    ActionTip_select_update |
    ActionTip_dropTarget_update | ActionTip_dropTarget_none
    ;

/**
 * *********************************************************************************************************
 * *********************************************************************************************************
 */

export const ActionTip_collection = {
    [ActionTip_type_select]: ActionTip_select, [ActionTip_type_select_none]: ActionTip_select_none,
    [ActionTip_type_select_update]: ActionTip_select_update,
    [ActionTip_type_dropTarget_update]: ActionTip_dropTarget_update, [ActionTip_type_dropTarget_none]: ActionTip_dropTarget_none,
}