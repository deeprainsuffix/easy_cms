import { Category_Layout } from ".";
import { CNode } from "..";
import { E_componentName_layout } from "../type";
import { Container_active } from "./Container_active";

export class Container_cNode extends Category_Layout {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
    ) {
        const isDraggable = true;
        const isDroppable = true;
        const props = {};
        const cssStyle = {};
        super(
            parent, next, children, E_componentName_layout.container,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}

Container_cNode.prototype.ReactComponentFunc = Container_active;