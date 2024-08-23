import { Category_Foundation } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../index.type";
import { Root_CNode_UI } from "./Root_CNode.UI";
import { Root_CNode_UI_Props } from "./Root_CNode.UI.Props";
import { type I_Root_cNode_props, Root_cNode_meta, Root_cNode_props_key } from './Root_CNode.meta';
export interface I_Root_CNode extends I_CNode_Concrete {
    componentName: typeof Root_cNode_meta['componentName'];
    title: typeof Root_cNode_meta['title'];
    props: I_Root_cNode_props;
}

export class Root_CNode extends Category_Foundation implements I_Root_CNode {
    componentName: I_Root_CNode['componentName'];
    title: I_Root_CNode['title'];
    props: I_Root_CNode['props'];
    cssStyle: I_Root_CNode['cssStyle'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const isDraggable = false, isDroppable = true;
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentName = Root_cNode_meta.componentName;
        this.title = Root_cNode_meta.title;
        this.props = {};
        this.cssStyle = {};
    }

    get CNode_UI() {
        return Root_CNode_UI
    }

    get CNode_UI_Props() {
        return Root_CNode_UI_Props
    }
}