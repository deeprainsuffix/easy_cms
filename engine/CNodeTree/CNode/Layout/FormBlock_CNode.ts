import { actionController } from "@/engine/ActionController";
import { Category_Layout } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../index.type";
import { FormBlock_CNode_UI } from "./FormBlock_CNode.UI";
import { FormBlock_CNode_UI_Props } from "./FormBlock_CNode.UI.Props";
import { ActionTip_type_select_update } from "@/engine/ActionController/ActionTip";
import { type I_FormBlock_cNode_props, FormBlock_cNode_meta, FormBlock_CNode_props_key } from './FormBlock_CNode.meta';

export interface I_FormBlock_CNode extends I_CNode_Concrete {
    componentName: typeof FormBlock_cNode_meta['componentName'];
    title: typeof FormBlock_cNode_meta['title'];
    props: I_FormBlock_cNode_props;
}

export class FormBlock_CNode extends Category_Layout implements I_FormBlock_CNode {
    componentName: I_FormBlock_CNode['componentName'];
    title: I_FormBlock_CNode['title'];
    props: I_FormBlock_CNode['props'];
    cssStyle: I_FormBlock_CNode['cssStyle'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const isDraggable = true, isDroppable = true;
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentName = FormBlock_cNode_meta.componentName;
        this.title = FormBlock_cNode_meta.title;
        this.props = {
            [FormBlock_CNode_props_key.widthRadio]: '100%',
            [FormBlock_CNode_props_key.widthRadio_prev]: '100%',
            [FormBlock_CNode_props_key.columnNum]: '2',
            [FormBlock_CNode_props_key.columnNum_prev]: '2',
        };
        this.cssStyle = {};

        this.lifeCycleRegister('afterDomUpdated', () => {
            if (this.props['widthRadio_prev'] !== this.props['widthRadio']) {
                this.props['widthRadio_prev'] = this.props['widthRadio'];
                actionController.dispatchAction({
                    type: ActionTip_type_select_update,
                });

                return
            }

            if (this.props['columnNum_prev'] !== this.props['columnNum']) {
                this.props['columnNum_prev'] = this.props['columnNum'];
                actionController.dispatchAction({
                    type: ActionTip_type_select_update,
                });

                return
            }
        });
    }

    get CNode_UI() {
        return FormBlock_CNode_UI
    }

    get CNode_UI_Props() {
        return FormBlock_CNode_UI_Props
    }
}