import { Category_Foundation } from ".";
import type { I_CNode } from "../index.type";
import { Root_CNode_UI } from "./Root_CNode.UI";
import { Root_CNode_UI_Props } from "./Root_CNode.UI.Props";
import { type I_Root_cNode_props, Root_cNode_meta, Root_cNode_props_key } from './Root_CNode.meta';
export interface I_Root_CNode extends I_CNode {
    componentName: typeof Root_cNode_meta['componentName'];
    title: typeof Root_cNode_meta['title'];
    props: I_Root_cNode_props;
}

export class Root_CNode extends Category_Foundation implements I_Root_CNode {
    public componentName: I_Root_CNode['componentName'];
    public title: I_Root_CNode['title'];
    public isDraggable: I_Root_CNode['isDraggable'];
    public isDroppable: I_Root_CNode['isDroppable'];
    public isDropTarget: I_Root_CNode['isDropTarget'];
    public props: I_Root_CNode['props'];
    public cssStyle: I_Root_CNode['cssStyle'];
    public cssStyle_default: I_Root_CNode['cssStyle_default'];

    constructor(
        id: I_CNode['id'], parent: I_CNode['parent'], pos: I_CNode['pos'], children: I_CNode['children'],
    ) {
        super(id, parent, pos, children);
        this.isDraggable = false;
        this.isDroppable = true;
        this.isDropTarget = false;
        this.componentName = Root_cNode_meta.componentName;
        this.title = Root_cNode_meta.title;
        this.props = {};
        this.cssStyle = {};
        this.cssStyle_default = { ...this.cssStyle };
    }

    get CNode_UI() {
        return Root_CNode_UI
    }

    get CNode_UI_Props() {
        return Root_CNode_UI_Props
    }
}