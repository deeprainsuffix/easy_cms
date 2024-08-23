import type { CSSProperties, FunctionComponent } from "react";
import type { CNode } from ".";

import type { I_Category_Foundation } from "./Foundation";
import type { I_Root_CNode, Root_CNode } from "./Foundation/Root_CNode";

import type { I_Category_Layout } from "./Layout";
import type { FormBlock_CNode, I_FormBlock_CNode } from './Layout/FormBlock_CNode'

import type { I_Category_Form } from "./Form";
import type { I_Input_CNode, Input_CNode } from './Form/Input_CNode'
import type { I_Select_CNode, Select_CNode } from "./Form/Select_CNode";
import type { FileUpload_CNode, I_FileUpload_CNode } from "./Form/FileUpload_CNode";

export type T_componentCategory =
    I_Category_Foundation['componentCategory'] | // 地基类
    I_Category_Layout['componentCategory'] | // 布局类
    I_Category_Form['componentCategory'] // 表单类
    ;

type T_componentName_foundation =
    I_Root_CNode['componentName']
    ;

type T_componentName_layout =
    I_FormBlock_CNode['componentName']
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

// 最终的节点类型
export interface I_CNode_Concrete extends I_CNode_Category {
    componentName: T_ComponentName; // 组件标识符
    title: string; // 组件名称
    props: I_CNode_props; // 属性
    cssStyle: I_CNode_cssStyle; // 样式 todo
    get CNode_UI(): FunctionComponent<any>; // 在画布中展示的UI
    get CNode_UI_Props(): FunctionComponent<any>; // 在SettingProps展示的props
}

export type T_CNode_foundation =
    Root_CNode
    ;
export type T_CNode_layout =
    FormBlock_CNode
    ;
export type T_CNode_form =
    Input_CNode |
    Select_CNode |
    FileUpload_CNode
    ;
// 所有节点类型
export type T_CNode_Concrete =
    T_CNode_foundation |
    T_CNode_layout |
    T_CNode_form
    ;

export interface I_CNode_JSON extends Omit<I_CNode_Concrete, 'isDraggable' | 'isDroppable' | 'parent' | 'children'> {
    children: I_CNode_JSON[];
};

