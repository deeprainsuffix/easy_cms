import { Category_Form } from ".";
import { CNode } from "..";
import { Input_active } from "./Input_active";

export const Input_cNode_meta = {
    componentName: 'input',
    title: '输入框',
} as const;

export class Input_cNode extends Category_Form {
    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const componentName = Input_cNode_meta.componentName,
            title = Input_cNode_meta.title,
            isDraggable = true, isDroppable = true,
            props = {},
            cssStyle = {};
        super(
            id, parent, pos, children,
            componentName,
            title,
            isDraggable, isDroppable,
            props, cssStyle,
        )
    }
}

Input_cNode.prototype.ReactComponentFuncActive = Input_active;