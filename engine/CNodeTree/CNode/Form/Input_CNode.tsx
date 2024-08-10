import React from 'react';
import { Category_Form, props_Form_CNode_base, type I_props_Form_CNode_base } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../type";
import { Input_CNode_UI } from "./Input_CNode_UI";
import { Input_CNode_UI_Props } from "./Input_CNode_UI_Props";

export const Input_cNode_meta = {
    componentName: 'input',
    title: '输入框',
    Icon_Left: () => (
        <svg className='icon_CNode_UI_Left' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4495" width="32" height="32">
            <path d="M896 224H128c-35.2 0-64 28.8-64 64v448c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V288c0-35.2-28.8-64-64-64z m0 480c0 19.2-12.8 32-32 32H160c-19.2 0-32-12.8-32-32V320c0-19.2 12.8-32 32-32h704c19.2 0 32 12.8 32 32v384z" fill="#333333" p-id="4496"></path>
            <path d="M224 352c-19.2 0-32 12.8-32 32v256c0 16 12.8 32 32 32s32-12.8 32-32V384c0-16-12.8-32-32-32z" fill="currentColor" p-id="4497"></path>
        </svg>
    )
} as const;

export const props_Input_CNode = Object.assign({}, props_Form_CNode_base);
export interface I_props_Form_CNode extends I_props_Form_CNode_base { }

interface I_props_Input_cNode extends I_props_Form_CNode { }

export interface I_Input_CNode extends I_CNode_Concrete {
    componentName: typeof Input_cNode_meta['componentName'];
    title: typeof Input_cNode_meta['title'];
    props: I_props_Input_cNode;
}

export class Input_CNode extends Category_Form implements I_Input_CNode {
    componentName: I_Input_CNode['componentName'];
    title: I_Input_CNode['title'];
    props: I_Input_CNode['props'];
    cssStyle: I_Input_CNode['cssStyle'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const isDraggable = true, isDroppable = true;
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentName = Input_cNode_meta.componentName;
        this.title = Input_cNode_meta.title;
        this.props = {
            [props_Input_CNode.fieldKey]: `field-${id}`,
            [props_Input_CNode.fieldLabel]: `字段-${id}`,
            [props_Input_CNode.fieldPlaceholder]: `${Input_cNode_meta.title}-${id}`,
        };
        this.cssStyle = {};
    }
}

Input_CNode.prototype.CNode_UI = Input_CNode_UI;
Input_CNode.prototype.CNode_UI_props = Input_CNode_UI_Props;