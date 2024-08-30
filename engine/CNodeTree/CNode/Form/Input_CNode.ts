import { Category_Form } from ".";
import type { I_CNode } from "../index.type";
import { Input_CNode_UI } from "./Input_CNode.UI";
import { Input_CNode_UI_Props } from "./Input_CNode.UI.Props";
import { type I_Input_cNode_props, Input_cNode_meta, Input_CNode_props_key } from './Input_CNode.meta';

export interface I_Input_CNode extends I_CNode {
    componentName: typeof Input_cNode_meta['componentName'];
    title: typeof Input_cNode_meta['title'];
    props: I_Input_cNode_props;
}

export class Input_CNode extends Category_Form implements I_Input_CNode {
    public componentName: I_Input_CNode['componentName'];
    public title: I_Input_CNode['title'];
    public isDraggable: I_Input_CNode['isDraggable'];
    public isDroppable: I_Input_CNode['isDroppable'];
    public isDropTarget: I_Input_CNode['isDropTarget'];
    public props: I_Input_CNode['props'];
    public cssStyle: I_Input_CNode['cssStyle'];
    public cssStyle_default: I_Input_CNode['cssStyle_default'];

    constructor(
        id: I_CNode['id'], parent: I_CNode['parent'], pos: I_CNode['pos'], children: I_CNode['children'],
    ) {
        super(id, parent, pos, children);
        this.isDraggable = true;
        this.isDroppable = true;
        this.isDropTarget = false;
        this.componentName = Input_cNode_meta.componentName;
        this.title = Input_cNode_meta.title;
        this.props = {
            [Input_CNode_props_key.fieldKey]: `field-${id}`,
            [Input_CNode_props_key.fieldLabel]: `字段-${id}`,
            [Input_CNode_props_key.fieldPlaceholder]: `${Input_cNode_meta.title}-${id}`,
        };
        this.cssStyle = {};
        this.cssStyle_default = { ...this.cssStyle };
    }

    get CNode_UI() {
        return Input_CNode_UI
    }

    get CNode_UI_Props() {
        return Input_CNode_UI_Props
    }
}