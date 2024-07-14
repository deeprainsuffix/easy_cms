import { Category_Foundation, Category_Foundation_meta } from ".";
import { CNode } from "..";
import { E_componentName_foundation } from "../type";
import { Root_active } from "./Root_active";

export const Root_cNode_meta = {
    componentCategory: Category_Foundation_meta.componentCategory,
    componentName: E_componentName_foundation.root,
    title: '根',
} as const;

export class Root_cNode extends Category_Foundation {
    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const componentCategory = Category_Foundation_meta.componentCategory, componentName = E_componentName_foundation.root;
        const title = Root_cNode_meta.title;
        const isDraggable = false, isDroppable = true;
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

Root_cNode.prototype.ReactComponentFuncActive = Root_active;