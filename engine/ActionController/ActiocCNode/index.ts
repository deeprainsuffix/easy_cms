import type { T_ComponentName, I_CNode_props, I_CNode_cssStyle } from "../../CNodeTree/CNode/type";

let id = 0; // id发生器 todo

/**
 * 生成新节点
 */
export const ActionCNode_type_add = 'add';
export interface I_ActionCNode_add {
    type: typeof ActionCNode_type_add;
    id: string; // 新生成id
    parentId: string;
    componentName: T_ComponentName;
    pos?: number;
}

export class ActionCNode_add implements I_ActionCNode_add {
    type: typeof ActionCNode_type_add;
    id: string;
    constructor(
        public parentId: string,
        public componentName: T_ComponentName,
        public pos?: number,
    ) {
        this.type = ActionCNode_type_add;
        this.id = String(++id);
    }
}


/**
 * 添加旧节点，用于action_reverse
 */
export const ActionCNode_type_re_add = 're_add';
export interface I_ActionCNode_re_add {
    type: typeof ActionCNode_type_re_add;
    id: string;
    parentId: string;
}

export class ActionCNode_re_add implements I_ActionCNode_re_add {
    type: typeof ActionCNode_type_re_add;
    constructor(
        public id: string,
        public parentId: string,
    ) {
        this.type = ActionCNode_type_re_add;
    }
}


/**
 * 复制节点
 */
export const ActionCNode_type_copy = 'copy';
export interface I_ActionCNode_copy {
    type: typeof ActionCNode_type_copy;
    id: string; // 新生成id
    copyedId: string;
    parentId: string; // 其实这个属性只为了Action_reverse服务
}

export class ActionCNode_copy implements I_ActionCNode_copy {
    type: typeof ActionCNode_type_copy;
    id: string;
    constructor(
        public copyedId: string,
        public parentId: string,
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
    moveFromParentId: string;
    moveFromPos: number;
    moveToParentId: string;
    moveToPos: number;
}

export class ActionCNode_move implements I_ActionCNode_move {
    type: typeof ActionCNode_type_move;
    constructor(
        public id: string,
        public moveFromParentId: string,
        public moveFromPos: number,
        public moveToParentId: string,
        public moveToPos: number,
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
    prevParentId: string;
}

export class ActionCNode_delete implements I_ActionCNode_delete {
    type: typeof ActionCNode_type_delete;
    constructor(
        public id: string,
        public prevParentId: string,
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
    updateKey: [keyof I_CNode_props][], // 例如[a, b, c] 则更新cNode.props[a][b][c] todo
}

// 设计这部分的反命令时再说，包括后边的cssStyle，等到开发RIght时再具体设定 todo 
interface T_updateKey_keys {
    oldValue: I_CNode_props[keyof I_CNode_props];
    newValue: I_CNode_props[keyof I_CNode_props];
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