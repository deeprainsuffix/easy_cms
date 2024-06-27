import { CNode } from ".";

// 和React fiber树节点结构一样
export interface I_CNode {
    id: number;
    parent: CNode | null;
    next: CNode | null;
    children: CNode[];
}

export enum componentCategory {
    layout = 'layout',
    form = 'form',
}

interface I_componentCategory {
    layout: 'layout',
    form: 'form',
}
export type T_componentCategory = keyof I_componentCategory;




export enum componentName_layout {
    container = 'container',
    container_half = 'container_half',
}
export enum componentName_form {
    input = 'input',
    select = 'select',
}
export type T_ComponentName = {
    [componentCategory.layout]: 'container' | 'container_half';
    [componentCategory.form]: 'input' | 'select';
}