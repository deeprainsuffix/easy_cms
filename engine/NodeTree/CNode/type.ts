import { CNode } from ".";

// 和React fiber树节点结构一样
export interface I_CNode {
    id: number;
    parent: CNode | null;
    next: CNode | null;
    children: CNode[];
}

/**
 * *********************************************************************************************************
 * *********************************************************************************************************
 */

export enum E_componentCategory {
    root = 'root',
    layout = 'layout',
    form = 'form',
}
export type T_componentCategory = keyof typeof E_componentCategory;


export enum E_componentName_root {
    root = 'root',
}
export enum E_componentName_layout {
    container = 'container',
    // container_half = 'container_half',
}
export enum E_componentName_form {
    input = 'input',
    // select = 'select',
}
export const componentName = Object.assign(
    {},
    E_componentName_root,
    E_componentName_layout,
    E_componentName_form,
);
export type T_ComponentName = keyof typeof componentName;


/**
 * *********************************************************************************************************
 * *********************************************************************************************************
 */