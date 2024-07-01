import type { CSSProperties } from "react";
import { CNode } from ".";

export interface I_CNode_props {

}

export interface I_CNode_cssStyle extends CSSProperties {

};

export interface I_CNode {
    // cNode唯一id
    id: string;

    // cNode指针结构 和React fiber树节点结构一样 todo 好像因为children的关系next没用了
    parent: CNode | null;
    next: CNode | null;
    children: CNode[];

    // meta
    componentCategory: T_componentCategory; // 组件类别 todo 可能没用
    componentName: T_ComponentName; // 组件标识符
    title: string; // 组件名称

    // 交互相关
    isDraggable: boolean; // 是否可拖拽
    isDroppable: boolean; // 是否可作为drop容器

    // 属性
    props: I_CNode_props;

    // 样式
    cssStyle: I_CNode_cssStyle; // todo
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