import { Category_Layout } from ".";
import { CNode } from "..";
import { Container_active } from "./Container_active";

export const Container_cNode_meta = {
    componentName: 'container',
    title: '容器',
} as const;

export class Container_cNode extends Category_Layout {
    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const componentName = Container_cNode_meta.componentName,
            title = Container_cNode_meta.title,
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

Container_cNode.prototype.ReactComponentFuncActive = Container_active;