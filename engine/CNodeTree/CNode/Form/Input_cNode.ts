import { Category_Form, Category_Form_meta } from ".";
import { CNode } from "..";
import { E_componentName_form } from "../type";
import { Input_active } from "./Input_active";

export const Input_cNode_meta = {
    componentCategory: Category_Form_meta.componentCategory,
    componentName: E_componentName_form.input,
    title: '输入框',
} as const;

export class Input_cNode extends Category_Form {
    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const componentCategory = Category_Form_meta.componentCategory, componentName = E_componentName_form.input;
        const title = Input_cNode_meta.title;
        const isDraggable = true, isDroppable = true;
        const props = {};
        const cssStyle = {};
        super(
            id, parent, pos, children,
            componentCategory, componentName,
            title,
            isDraggable, isDroppable,
            props, cssStyle,
        )
    }
}

Input_cNode.prototype.ReactComponentFunc = Input_active;