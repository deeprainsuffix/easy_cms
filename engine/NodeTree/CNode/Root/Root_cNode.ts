import { Category_Root } from ".";
import { CNode } from "..";
import { E_componentName_root } from "../type";
import { Root_active } from "./Root_active";

export class Root_cNode extends Category_Root {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
    ) {
        const isDraggable = false;
        const isDroppable = true;
        const props = {};
        const cssStyle = {};
        super(
            parent, next, children, E_componentName_root.root,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}

Root_cNode.prototype.ReactComponentFunc = Root_active;