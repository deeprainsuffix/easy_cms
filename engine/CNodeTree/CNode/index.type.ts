import type { CSSProperties, FunctionComponent, RefObject } from "react";

import type { I_Category_Foundation } from "./Foundation";
import type { I_Root_CNode, Root_CNode } from "./Foundation/Root_CNode";

import type { I_Category_Layout } from "./Layout";
import type { FormBlock_CNode, I_FormBlock_CNode } from './Layout/FormBlock_CNode'

import type { I_Category_Form } from "./Form";
import type { I_Input_CNode, Input_CNode } from './Form/Input_CNode'
import type { I_Select_CNode, Select_CNode } from "./Form/Select_CNode";
import type { FileUpload_CNode, I_FileUpload_CNode } from "./Form/FileUpload_CNode";

type T_componentCategory =
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

type T_ComponentName =
    T_componentName_foundation |
    T_componentName_layout |
    T_componentName_form
    ;

interface I_CNode_props { // 每个组件会设置自己的props
    [index: string | number | symbol]: any;
};

export interface I_CNode_base {
    id: string; // cNode唯一id
    parent: T_CNode | null; // 父节点
    pos: number; // 父节点中children的位置
    children: T_CNode[] // 子节点
    ref: RefObject<HTMLDivElement> // 传递给ref，标记真实DOM，作为实例的具体属性
    render: any; // 组件刷新句柄，这个属性在react组件生成时添加，作为实例的具体属性
};

export interface I_CNode_Category extends I_CNode_base {
    componentCategory: T_componentCategory; // 组件类别 todo 可能没用
};

// 最终的节点类型
export interface I_CNode extends I_CNode_Category {
    componentName: T_ComponentName; // 组件标识符
    title: string; // 组件名称
    isDraggable: boolean; // 是否可拖拽
    isDroppable: boolean; // 是否可作为drop容器
    isDropTarget: boolean; // 作为即将被drop的节点 isDroppable=true
    // isSelected: boolean; // 是否被选中
    props: I_CNode_props; // 属性
    cssStyle: CSSProperties; // 样式
    cssStyle_default: CSSProperties; // 提供样式重置
    get CNode_UI(): FunctionComponent<any>; // 在画布中展示的UI
    get CNode_UI_Props(): FunctionComponent<any>; // 在SettingProps展示的props
};

type T_CNode_foundation =
    Root_CNode
    ;
type T_CNode_layout =
    FormBlock_CNode
    ;
type T_CNode_form =
    Input_CNode |
    Select_CNode |
    FileUpload_CNode
    ;
// 所有节点类型
export type T_CNode =
    T_CNode_foundation |
    T_CNode_layout |
    T_CNode_form
    ;

// type T_JSON_exclude = 'isDraggable' | 'isDroppable' | 'isDropTarget' | 'parent' | 'children';
// export interface I_CNode_JSON extends Omit<I_CNode, T_JSON_exclude> {
//     children: I_CNode_JSON[];
// };
export interface I_CNode_JSON {
    id: I_CNode['id'];
    componentCategory: I_CNode['componentCategory'];
    componentName: I_CNode['componentName'];
    title: I_CNode['title']; // 好像没用
    props: I_CNode['props'],
    cssStyle: I_CNode['cssStyle'];

    children: I_CNode_JSON[];
};