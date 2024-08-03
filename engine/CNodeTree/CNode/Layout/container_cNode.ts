import { Category_Layout } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../type";
import { Container_CNode_UI } from "./Container_CNode_UI";

export const Container_cNode_meta = {
    componentName: 'container',
    title: '容器',
} as const;

interface I_props_Container_cNode {

}

export interface I_Container_CNode extends I_CNode_Concrete {
    componentName: typeof Container_cNode_meta['componentName'];
    title: typeof Container_cNode_meta['title'];
    props: I_props_Container_cNode;
}

export class Container_CNode extends Category_Layout implements I_Container_CNode {
    componentName: I_Container_CNode['componentName'];
    title: I_Container_CNode['title'];
    props: I_Container_CNode['props'];
    cssStyle: I_Container_CNode['cssStyle'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const isDraggable = true, isDroppable = true;
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentName = Container_cNode_meta.componentName;
        this.title = Container_cNode_meta.title;
        this.props = {

        };
        this.cssStyle = {};
    }
}

Container_CNode.prototype.CNode_UI = Container_CNode_UI;