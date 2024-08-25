import { Category_Form } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../index.type";
import { Select_CNode_UI } from "./Select_CNode.UI";
import { Select_CNode_UI_Props } from "./Select_CNode.UI.Props";
import { type I_Select_cNode_props, Select_CNode_props_key, Select_cNode_meta } from './Select_CNode.meta';

export interface I_Select_CNode extends I_CNode_Concrete {
    componentName: typeof Select_cNode_meta['componentName'];
    title: typeof Select_cNode_meta['title'];
    props: I_Select_cNode_props;
}

export class Select_CNode extends Category_Form implements I_Select_CNode {
    componentName: I_Select_CNode['componentName'];
    title: I_Select_CNode['title'];
    props: I_Select_CNode['props'];
    cssStyle: I_Select_CNode['cssStyle'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const isDraggable = true, isDroppable = true;
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentName = Select_cNode_meta.componentName;
        this.title = Select_cNode_meta.title;
        this.props = {
            [Select_CNode_props_key.fieldKey]: `field-${id}`,
            [Select_CNode_props_key.fieldLabel]: `字段-${id}`,
            [Select_CNode_props_key.fieldPlaceholder]: '请选择',
        };
        this.cssStyle = {};
    }

    get CNode_UI() {
        return Select_CNode_UI
    }

    get CNode_UI_Props() {
        return Select_CNode_UI_Props
    }
}