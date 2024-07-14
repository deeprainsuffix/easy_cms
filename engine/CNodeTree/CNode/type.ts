import type { CSSProperties } from "react";
import { CNode } from ".";
import {
    T_componentCategory_foundation,
    T_componentName_foundation,
} from "./Foundation";
import {
    T_componentCategory_layout,
    T_componentName_layout,
} from "./Layout";
import {
    T_componentCategory_form,
    T_componentName_form,
} from "./Form";

/**
 * *********************************************************************************************************
 * *********************************************************************************************************
 */

export interface I_CNode_props {

}

export interface I_CNode_cssStyle extends CSSProperties {

};

export interface I_CNode {
    // cNode唯一id
    id: string;

    // cNode指针结构 和React fiber树节点结构一样 todo 好像因为children的关系next没用了
    parent: CNode | null;
    pos: number;
    children: (CNode | null)[];  // CNode | null[];

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

export type T_componentCategory =
    T_componentCategory_foundation | // 地基类
    T_componentCategory_layout | // 布局类
    T_componentCategory_form // 表单类
    ;

export type T_ComponentName =
    T_componentName_foundation |
    T_componentName_layout |
    T_componentName_form
    ;

/**
 * *********************************************************************************************************
 * *********************************************************************************************************
 */