import { Category_Form, Category_Form_meta } from ".";
import { CNode } from "..";
import { E_componentName_form } from "../type";
import { Input_active } from "./Input_active";

export const Input_cNode_meta = {
    componentCategory: Category_Form_meta.componentCategory,
    componentName: E_componentName_form.input,
    title: '输入框',
};

export class Input_cNode extends Category_Form {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
    ) {
        const componentCategory = Category_Form_meta.componentCategory, componentName = E_componentName_form.input;
        const title = Input_cNode_meta.title;
        const isDraggable = true, isDroppable = true;
        const props = {};
        const cssStyle = {};
        super(
            parent, next, children,
            componentCategory, componentName,
            title,
            isDraggable, isDroppable,
            props, cssStyle,
        )
    }
}

Input_cNode.prototype.ReactComponentFunc = Input_active;