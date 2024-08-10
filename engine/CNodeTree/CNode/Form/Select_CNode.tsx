import React from 'react';
import { Category_Form, props_Form_CNode_base, type I_props_Form_CNode_base } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../type";
import { Select_CNode_UI } from "./Select_CNode_UI";
import { Select_CNode_UI_Props } from "./Select_CNode_UI_Props";

export const Select_cNode_meta = {
    componentName: 'select',
    title: '下拉选择框',
    Icon_Left: () => (
        <svg className='icon_CNode_UI_Left' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4495" width="32" height="32">
            <path d="M896 64H128c-35.2 0-64 28.8-64 64v96c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64v-96c0-35.2-28.8-64-64-64z m0 144c0 9.6-6.4 16-16 16H144c-9.6 0-16-6.4-16-16v-64c0-9.6 6.4-16 16-16h736c9.6 0 16 6.4 16 16v64zM768 320H128c-35.2 0-64 28.8-64 64v512c0 35.2 28.8 64 64 64h640c35.2 0 64-28.8 64-64V384c0-35.2-28.8-64-64-64z m0 544c0 19.2-16 32-32 32H160c-16 0-32-12.8-32-32V416c0-19.2 16-32 32-32h576c16 0 32 12.8 32 32v448z" fill="currentColor" p-id="4496"></path>
            <path d="M656 736H240c-9.6 0-16 6.4-16 16v32c0 9.6 6.4 16 16 16h416c9.6 0 16-6.4 16-16v-32c0-9.6-6.4-16-16-16z m0-256H240c-9.6 0-16 6.4-16 16v32c0 9.6 6.4 16 16 16h416c9.6 0 16-6.4 16-16v-32c0-9.6-6.4-16-16-16z m0 128H240c-9.6 0-16 6.4-16 16v32c0 9.6 6.4 16 16 16h416c9.6 0 16-6.4 16-16v-32c0-9.6-6.4-16-16-16z" fill="currentColor" p-id="4497"></path>
        </svg>
    )
} as const;

export const props_Select_CNode = Object.assign({}, props_Form_CNode_base);
export interface I_props_Form_CNode extends I_props_Form_CNode_base { }

interface I_props_Select_cNode extends I_props_Form_CNode { }

export interface I_Select_CNode extends I_CNode_Concrete {
    componentName: typeof Select_cNode_meta['componentName'];
    title: typeof Select_cNode_meta['title'];
    props: I_props_Select_cNode;
}

export class Select_CNode extends Category_Form implements I_Select_CNode {
    componentName: I_Select_CNode['componentName'];
    title: I_Select_CNode['title'];
    props: I_Select_CNode['props'];
    cssStyle: I_Select_CNode['cssStyle'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const isDraggable = true, isDroppable = true;
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentName = Select_cNode_meta.componentName;
        this.title = Select_cNode_meta.title;
        this.props = {
            [props_Select_CNode.fieldKey]: `field-${id}`,
            [props_Select_CNode.fieldLabel]: `字段-${id}`,
            [props_Select_CNode.fieldPlaceholder]: '选择一项',
        };
        this.cssStyle = {};
    }
}

Select_CNode.prototype.CNode_UI = Select_CNode_UI;
Select_CNode.prototype.CNode_UI_props = Select_CNode_UI_Props;