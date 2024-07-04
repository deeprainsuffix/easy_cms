import type { T_ComponentName, I_CNode_props, I_CNode_cssStyle } from "../../CNodeTree/CNode/type";

let id = 0; // id发生器 todo

/**
 * 生成新节点
 */
export const ActionCNode_type_Add = 'add';
export interface I_ActionCNode_add {
    type: typeof ActionCNode_type_Add;
    id: string; // 新生成id
    parentId: string;
    componentName: T_ComponentName;
}

export class ActionCNode_add implements I_ActionCNode_add {
    type: typeof ActionCNode_type_Add;
    id: string;
    constructor(
        public parentId: string,
        public componentName: T_ComponentName,
    ) {
        this.type = ActionCNode_type_Add;
        this.id = String(++id);
    }
}


/**
 * 复制节点
 */
export const ActionCNode_type_copy = 'copy';
export interface I_ActionCNode_copy {
    type: typeof ActionCNode_type_copy;
    id: string; // 新生成id
    copyId: string;
}

export class ActionCNode_copy implements I_ActionCNode_copy {
    type: typeof ActionCNode_type_copy;
    id: string;
    constructor(
        public copyId: string,
    ) {
        this.type = ActionCNode_type_copy;
        this.id = String(++id);
    }
}


/**
 * 移动节点
 */
export const ActionCNode_type_move = 'move';
export interface I_ActionCNode_move {
    type: typeof ActionCNode_type_move;
    id: string;
    moveToParentId: string;
}

export class ActionCNode_move implements I_ActionCNode_move {
    type: typeof ActionCNode_type_move;
    constructor(
        public id: string,
        public moveToParentId: string,
    ) {
        this.type = ActionCNode_type_move;
    }
}


/**
 * 如果cNode中不含顺序信息，则要保存一个顺序字段 todo
 */
export const ActionCNode_type_delete = 'delete';
export interface I_ActionCNode_delete {
    type: typeof ActionCNode_type_delete;
    id: string;
}

export class ActionCNode_delete implements I_ActionCNode_delete {
    type: typeof ActionCNode_type_delete;
    constructor(
        public id: string,
    ) {
        this.type = ActionCNode_type_delete;
    }
}


/**
 * 更改节点props，该属性更改参与时间旅行
 */
export const ActionCNode_type_update_props = 'update_props';
export interface I_ActionCNode_update_props {
    type: typeof ActionCNode_type_update_props;
    id: string;
    updateKey: [keyof I_CNode_props][], // 例如[a, b, c] 则更新cNode.props[a][b][c]
}

export class ActionCNode_update_props implements I_ActionCNode_update_props {
    type: typeof ActionCNode_type_update_props;
    constructor(
        public id: string,
        public updateKey: [keyof I_CNode_props][],
    ) {
        this.type = ActionCNode_type_update_props;
    }
}


/**
 * 更改节点cssStyle
 */
export const ActionCNode_type_update_cssStyle = 'update_cssStyle';
export interface I_ActionCNode_update_cssStyle {
    type: typeof ActionCNode_type_update_cssStyle;
    id: string;
    updateKey: keyof I_CNode_cssStyle;
}

export class ActionCNode_update_cssStyle implements I_ActionCNode_update_cssStyle {
    type: typeof ActionCNode_type_update_cssStyle;
    constructor(
        public id: string,
        public updateKey: keyof I_CNode_cssStyle,
    ) {
        this.type = ActionCNode_type_update_cssStyle;
    }
}