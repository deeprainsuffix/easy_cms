import { actionController } from "@/engine/ActionController";
import { Category_Layout } from ".";
import type { I_CNode } from "../index.type";
import { FormBlock_CNode_UI } from "./FormBlock_CNode.UI";
import { FormBlock_CNode_UI_Props } from "./FormBlock_CNode.UI.Props";
import { ActionTip_type_select_update } from "@/engine/ActionController/ActionTip";
import { type I_FormBlock_cNode_props, FormBlock_cNode_meta, FormBlock_CNode_props_key } from './FormBlock_CNode.meta';

export interface I_FormBlock_CNode extends I_CNode {
    componentName: typeof FormBlock_cNode_meta['componentName'];
    title: typeof FormBlock_cNode_meta['title'];
    props: I_FormBlock_cNode_props;
}

export class FormBlock_CNode extends Category_Layout implements I_FormBlock_CNode {
    public componentName: I_FormBlock_CNode['componentName'];
    public title: I_FormBlock_CNode['title'];
    public isDraggable: I_FormBlock_CNode['isDraggable'];
    public isDroppable: I_FormBlock_CNode['isDroppable'];
    public isDropTarget: I_FormBlock_CNode['isDropTarget'];
    public props: I_FormBlock_CNode['props'];
    public cssStyle: I_FormBlock_CNode['cssStyle'];
    public cssStyle_default: I_FormBlock_CNode['cssStyle_default'];

    constructor(
        id: I_CNode['id'], parent: I_CNode['parent'], pos: I_CNode['pos'], children: I_CNode['children'],
    ) {
        super(id, parent, pos, children);
        this.isDraggable = true;
        this.isDroppable = true;
        this.isDropTarget = false;
        this.componentName = FormBlock_cNode_meta.componentName;
        this.title = FormBlock_cNode_meta.title;
        this.props = {
            [FormBlock_CNode_props_key.widthRadio]: '100%',
            [FormBlock_CNode_props_key.widthRadio_prev]: '100%',
            [FormBlock_CNode_props_key.columnNum]: '2',
            [FormBlock_CNode_props_key.columnNum_prev]: '2',
            [FormBlock_CNode_props_key.regionName]: `基本信息-${id}`
        };
        this.cssStyle = {};
        this.cssStyle_default = { ...this.cssStyle };

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