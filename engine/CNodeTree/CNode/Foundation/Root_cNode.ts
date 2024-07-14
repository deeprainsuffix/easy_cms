import { Category_Foundation } from ".";
import { CNode } from "..";
import { Root_active } from "./Root_active";

export const Root_cNode_meta = {
    componentName: 'root',
    title: '根',
} as const;

export class Root_cNode extends Category_Foundation {
    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const componentName = Root_cNode_meta.componentName,
            title = Root_cNode_meta.title,
            isDraggable = false, isDroppable = true,
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

Root_cNode.prototype.ReactComponentFuncActive = Root_active;