import { Category_Form } from ".";
import { CNode } from "..";
import { E_componentName_form } from "../type";
import { Input_active } from "./Input_active";

export class Input_cNode extends Category_Form {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
    ) {
        const isDraggable = true;
        const isDroppable = false;
        const props = {};
        const cssStyle = {};
        super(
            parent, next, children, E_componentName_form.input,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}

Input_cNode.prototype.ReactComponentFunc = Input_active;