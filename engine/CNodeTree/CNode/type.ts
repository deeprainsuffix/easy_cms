import type { CSSProperties } from "react";
import { CNode } from ".";

import { I_Category_Foundation } from "./Foundation";
import { I_Root_CNode } from "./Foundation/Root_CNode";

import { I_Category_Layout } from "./Layout";
import { I_Container_CNode } from './Layout/Container_CNode'

import { I_Category_Form } from "./Form";
import { I_Input_CNode } from './Form/Input_CNode'
import { I_Select_CNode } from "./Form/Select_CNode";
import { I_FileUpload_CNode } from "./Form/FileUpload_CNode";

export type T_componentCategory =
    I_Category_Foundation['componentCategory'] | // 地基类
    I_Category_Layout['componentCategory'] | // 布局类
    I_Category_Form['componentCategory'] // 表单类
    ;

type T_componentName_foundation =
    I_Root_CNode['componentName']
    ;

type T_componentName_layout =
    I_Container_CNode['componentName']
    ;

type T_componentName_form =
    I_Input_CNode['componentName'] |
    I_Select_CNode['componentName'] |
    I_FileUpload_CNode['componentName']
    ;

export type T_ComponentName =
    T_componentName_foundation |
    T_componentName_layout |
    T_componentName_form
    ;

export interface I_CNode_props {
    [index: string]: any;
}; // 每个组件会设置自己的props，这个还需要吗？ todo

export interface I_CNode_cssStyle extends CSSProperties { };

export interface I_CNode {
    // cNode唯一id
    id: string;
    // cNode指针结构 和React fiber树节点结构一样 todo 好像因为children的关系next没用了
    parent: CNode | null;
    pos: number;
    children: (CNode | null)[];
    // 交互相关
    isDraggable: boolean; // 是否可拖拽
    isDroppable: boolean; // 是否可作为drop容器
}

export interface I_CNode_Category extends I_CNode {
    componentCategory: T_componentCategory; // 组件类别 todo 可能没用
}

export interface I_CNode_Concrete extends I_CNode_Category {
    componentName: T_ComponentName; // 组件标识符
    title: string; // 组件名称
    props: I_CNode_props; // 属性
    cssStyle: I_CNode_cssStyle; // 样式 todo
}