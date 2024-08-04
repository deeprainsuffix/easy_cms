import { Category_Form, props_Form_CNode_base, type I_props_Form_CNode_base } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../type";
import { Input_CNode_UI } from "./Input_CNode_UI";
import { Input_CNode_UI_Props } from "./Input_CNode_UI_Props";

export const Input_cNode_meta = {
    componentName: 'input',
    title: '输入框',
} as const;

export const props_Input_cNode = Object.assign({}, props_Form_CNode_base);
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
            [props_Input_cNode.fieldKey]: `field-${id}`,
            [props_Input_cNode.fieldLabel]: `字段-${id}`,
            [props_Input_cNode.fieldPlaceholder]: `输入框-${id}`,
        };
        this.cssStyle = {};
    }
}

Input_CNode.prototype.CNode_UI = Input_CNode_UI;
Input_CNode.prototype.CNode_UI_props = Input_CNode_UI_Props;