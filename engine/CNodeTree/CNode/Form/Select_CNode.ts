import { Category_Form } from ".";
import type { I_CNode } from "../index.type";
import { Select_CNode_UI } from "./Select_CNode.UI";
import { Select_CNode_UI_Props } from "./Select_CNode.UI.Props";
import { type I_Select_cNode_props, Select_CNode_props_key, Select_cNode_meta } from './Select_CNode.meta';

export interface I_Select_CNode extends I_CNode {
    componentName: typeof Select_cNode_meta['componentName'];
    title: typeof Select_cNode_meta['title'];
    props: I_Select_cNode_props;
}

export class Select_CNode extends Category_Form implements I_Select_CNode {
    public componentName: I_Select_CNode['componentName'];
    public title: I_Select_CNode['title'];
    public isDraggable: I_Select_CNode['isDraggable'];
    public isDroppable: I_Select_CNode['isDroppable'];
    public isDropTarget: I_Select_CNode['isDropTarget'];
    public props: I_Select_CNode['props'];
    public cssStyle: I_Select_CNode['cssStyle'];
    public cssStyle_default: I_Select_CNode['cssStyle_default'];

    constructor(
        id: I_CNode['id'], parent: I_CNode['parent'], pos: I_CNode['pos'], children: I_CNode['children'],
    ) {
        super(id, parent, pos, children);
        this.isDraggable = true;
        this.isDroppable = true;
        this.isDropTarget = false;
        this.componentName = Select_cNode_meta.componentName;
        this.title = Select_cNode_meta.title;
        this.props = {
            [Select_CNode_props_key.fieldKey]: `field-${id}`,
            [Select_CNode_props_key.fieldLabel]: `字段-${id}`,
            [Select_CNode_props_key.fieldPlaceholder]: '请选择',
        };
        this.cssStyle = {};
        this.cssStyle_default = { ...this.cssStyle };
    }

    get CNode_UI() {
        return Select_CNode_UI
    }

    get CNode_UI_Props() {
        return Select_CNode_UI_Props
    }
}