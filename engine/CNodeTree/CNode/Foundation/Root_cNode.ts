import { Category_Foundation } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../type";
import { Root_CNode_UI } from "./Root_CNode_UI";
import { Root_CNode_UI_Props } from "./Root_CNode_UI_Props";

export const Root_cNode_meta = {
    componentName: 'root',
    title: '根',
} as const;

interface I_props_Root_cNode {

}

export interface I_Root_CNode extends I_CNode_Concrete {
    componentName: typeof Root_cNode_meta['componentName'];
    title: typeof Root_cNode_meta['title'];
    props: I_props_Root_cNode;
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
        this.props = {
        };
        this.cssStyle = {};
    }
}

Root_CNode.prototype.CNode_UI = Root_CNode_UI;
Root_CNode.prototype.CNode_UI_props = Root_CNode_UI_Props;