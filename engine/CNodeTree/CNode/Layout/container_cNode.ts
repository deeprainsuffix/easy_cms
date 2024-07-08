import { Category_Layout, Category_Layout_meta } from ".";
import { CNode } from "..";
import { E_componentName_layout } from "../type";
import { Container_active } from "./Container_active";

export const Container_cNode_meta = {
    componentCategory: Category_Layout_meta.componentCategory,
    componentName: E_componentName_layout.container,
    title: '容器',
} as const;

export class Container_cNode extends Category_Layout {
    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const componentCategory = Category_Layout_meta.componentCategory, componentName = E_componentName_layout.container;
        const title = Container_cNode_meta.title;
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

Container_cNode.prototype.ReactComponentFunc = Container_active;