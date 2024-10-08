
import type { T_CNode } from "../../CNodeTree/CNode/index.type";
import { idGenerator } from "@/engine/IdGenerator";

/**
 * 生成新节点
 */
export const ActionCNode_type_add = 'add';
export interface I_ActionCNode_add {
    type: typeof ActionCNode_type_add;
    id: string; // 新生成id
    parentId: string;
    componentName: T_CNode['componentName'];
    pos: number;
}

export class ActionCNode_add implements I_ActionCNode_add {
    type: typeof ActionCNode_type_add;
    id: string;
    constructor(
        public parentId: string,
        public componentName: T_CNode['componentName'],
        public pos: number,
    ) {
        this.type = ActionCNode_type_add;
        this.id = String(idGenerator.gene());
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
    pos: number;
}

export class ActionCNode_re_add implements I_ActionCNode_re_add {
    type: typeof ActionCNode_type_re_add;
    constructor(
        public id: string,
        public parentId: string,
        public pos: number,
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
    copyId: string;
    parentId: string; // 其实这个属性只为了Action_reverse服务
    pos: number;
}

export class ActionCNode_copy implements I_ActionCNode_copy {
    type: typeof ActionCNode_type_copy;
    id: string;
    constructor(
        public copyId: string,
        public parentId: string,
        public pos: number,
    ) {
        this.type = ActionCNode_type_copy;
        this.id = String(idGenerator.gene());
    }
}


/**
 * 移动节点(非兄弟间)
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
 * 移动节点(兄弟间)
 */
export const ActionCNode_type_move_sibling = 'move_sibling';
export interface I_ActionCNode_move_sibling {
    type: typeof ActionCNode_type_move_sibling;
    id: T_CNode['id'];
    parentId: T_CNode['id'];
    moveFromPos: T_CNode['pos'];
    moveToPos: T_CNode['pos'];
    moveAtLeft: boolean;
}
export class ActionCNode_move_sibling implements I_ActionCNode_move_sibling {
    type: I_ActionCNode_move_sibling['type'];
    constructor(
        public id: I_ActionCNode_move_sibling['id'],
        public parentId: I_ActionCNode_move_sibling['parentId'],
        public moveFromPos: I_ActionCNode_move_sibling['moveFromPos'],
        public moveToPos: I_ActionCNode_move_sibling['moveToPos'],
        public moveAtLeft: I_ActionCNode_move_sibling['moveAtLeft'],
    ) {
        this.type = ActionCNode_type_move_sibling;
    }
}

/**
 * ActionCNode_move_sibling反命令
 */
export const ActionCNode_type_re_move_sibling = 're_move_sibling';
export interface I_ActionCNode_re_move_sibling {
    type: typeof ActionCNode_type_re_move_sibling;
    id: T_CNode['id'];
    parentId: T_CNode['id'];
    moveFromPos: T_CNode['pos'];
    moveToPos: T_CNode['pos'];
    moveAtLeft: boolean;
}
export class ActionCNode_move_re_sibling implements I_ActionCNode_re_move_sibling {
    type: I_ActionCNode_re_move_sibling['type'];
    constructor(
        public id: I_ActionCNode_re_move_sibling['id'],
        public parentId: I_ActionCNode_re_move_sibling['parentId'],
        public moveFromPos: I_ActionCNode_re_move_sibling['moveFromPos'],
        public moveToPos: I_ActionCNode_re_move_sibling['moveToPos'],
        public moveAtLeft: I_ActionCNode_move_sibling['moveAtLeft'],
    ) {
        this.type = ActionCNode_type_re_move_sibling;
    }
}

/**
 * 删除节点
 */
export const ActionCNode_type_delete = 'delete';
export interface I_ActionCNode_delete {
    type: typeof ActionCNode_type_delete;
    id: string;
    prevParentId: string;
    pos: number;
}

export class ActionCNode_delete implements I_ActionCNode_delete {
    type: typeof ActionCNode_type_delete;
    constructor(
        public id: string,
        public prevParentId: string,
        public pos: number,
    ) {
        this.type = ActionCNode_type_delete;
    }
}

/**
 * *********************************************************************************************************
 * *********************************************************************************************************
 */

type I_ActionCNode_add_Required = {
    [prop in keyof I_ActionCNode_add as Exclude<prop, 'id'>]: I_ActionCNode_add[prop];
}
type I_ActionCNode_copy_Required = {
    [prop in keyof I_ActionCNode_copy as Exclude<prop, 'id'>]: I_ActionCNode_copy[prop];
}

export type T_ActionCNode_Required =
    I_ActionCNode_add_Required |
    // I_ActionCNode_re_add | // 不需要添加
    I_ActionCNode_copy_Required |
    I_ActionCNode_move |
    I_ActionCNode_move_sibling |
    // I_ActionCNode_re_move_sibling
    I_ActionCNode_delete
    ;

export type T_ActionCNode =
    ActionCNode_add |
    ActionCNode_re_add |
    ActionCNode_copy |
    ActionCNode_move |
    ActionCNode_move_sibling | ActionCNode_move_re_sibling |
    ActionCNode_delete
    ;

/**
 * *********************************************************************************************************
 * *********************************************************************************************************
 */

export const ActionCNode_collection = {
    [ActionCNode_type_add]: ActionCNode_add,
    [ActionCNode_type_re_add]: ActionCNode_re_add,
    [ActionCNode_type_copy]: ActionCNode_copy,
    [ActionCNode_type_move]: ActionCNode_move,
    [ActionCNode_type_move_sibling]: ActionCNode_move_sibling, [ActionCNode_type_re_move_sibling]: ActionCNode_move_re_sibling,
    [ActionCNode_type_delete]: ActionCNode_delete,
};

export const ActionCNode_reverse_collection = {

}; // todo