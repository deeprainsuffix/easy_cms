import { Category_Form } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../type";
import { Input_CNode_UI } from "./Input_CNode_UI";

export const Input_cNode_meta = {
    componentName: 'input',
    title: '输入框',
} as const;

interface I_props_Input_cNode {
    field: string;
    fieldKey: string;
    fieldValue: string;
}

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
            field: `field-${id}`,
            fieldKey: `字段-${id}`,
            fieldValue: `值-${id}`,
        };
        this.cssStyle = {};
    }
}

Input_CNode.prototype.CNode_UI = Input_CNode_UI;