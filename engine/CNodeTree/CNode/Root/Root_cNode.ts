import { Category_Root, Category_Root_meta } from ".";
import { CNode } from "..";
import { E_componentName_root } from "../type";
import { Root_active } from "./Root_active";

export const Root_cNode_meta = {
    componentCategory: Category_Root_meta.componentCategory,
    componentName: E_componentName_root.root,
    title: '根',
};

export class Root_cNode extends Category_Root {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
    ) {
        const componentCategory = Category_Root_meta.componentCategory, componentName = E_componentName_root.root;
        const title = Root_cNode_meta.title;
        const isDraggable = false, isDroppable = true;
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

Root_cNode.prototype.ReactComponentFunc = Root_active;