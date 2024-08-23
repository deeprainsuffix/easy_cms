import { Category_Form } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../index.type";
import { Input_CNode_UI } from "./Input_CNode.UI";
import { Input_CNode_UI_Props } from "./Input_CNode.UI.Props";
import { type I_Input_cNode_props, Input_cNode_meta, Input_CNode_props_key } from './Input_CNode.meta';

export interface I_Input_CNode extends I_CNode_Concrete {
    componentName: typeof Input_cNode_meta['componentName'];
    title: typeof Input_cNode_meta['title'];
    props: I_Input_cNode_props;
}

export class Input_CNode extends Category_Form implements I_Input_CNode {
    componentName: I_Input_CNode['componentName'];
    title: I_Input_CNode['title'];
    props: I_Input_CNode['props'];
    cssStyle: I_Input_CNode['cssStyle'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const isDraggable = true, isDroppable = true;
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentName = Input_cNode_meta.componentName;
        this.title = Input_cNode_meta.title;
        this.props = {
            [Input_CNode_props_key.fieldKey]: `field-${id}`,
            [Input_CNode_props_key.fieldLabel]: `字段-${id}`,
            [Input_CNode_props_key.fieldPlaceholder]: `${Input_cNode_meta.title}-${id}`,
        };
        this.cssStyle = {};
    }

    get CNode_UI() {
        return Input_CNode_UI
    }

    get CNode_UI_Props() {
        return Input_CNode_UI_Props
    }
}