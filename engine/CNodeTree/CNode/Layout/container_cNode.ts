import { actionController } from "@/engine/ActionController";
import { Category_Layout } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../type";
import { Container_CNode_UI } from "./Container_CNode_UI";
import { Container_CNode_UI_Props } from "./Container_CNode_UI_Props";
import { ActionTip_type_select, ActionTip_type_select_update } from "@/engine/ActionController/ActionTip";

export const Container_cNode_meta = {
    componentName: 'container',
    title: '容器',
} as const;

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
            [props_Container_CNode.widthRadio]: '100%',
            [props_Container_CNode.widthRadio_prev]: '100%',
            [props_Container_CNode.columnNum]: '2',
        };
        this.cssStyle = {};

        this.lifeCycleRegister('afterDomUpdated', () => {
            if (this.props['widthRadio_prev'] === this.props['widthRadio']) {
                return
            }

            this.props['widthRadio_prev'] = this.props['widthRadio'];
            actionController.dispatchAction({
                type: ActionTip_type_select_update,
            });
        });
    }
}

Container_CNode.prototype.CNode_UI = Container_CNode_UI;
Container_CNode.prototype.CNode_UI_props = Container_CNode_UI_Props;

export const props_Container_CNode = {
    widthRadio: 'widthRadio',
    widthRadio_prev: 'widthRadio_prev',
    columnNum: 'columnNum',
} as const;
export const props_Container_CNode_select = {
    [props_Container_CNode.widthRadio]: [
        {
            value: '100%',
            text: '100%',
        },
        {
            value: '50%',
            text: '50%',
        },
    ],
    [props_Container_CNode.columnNum]: [
        {
            value: '1',
            text: '一栏'
        },
        {
            value: '2',
            text: '两栏'
        },
        {
            value: '3',
            text: '三栏'
        },
        {
            value: '4',
            text: '四栏'
        },
    ]
} as const;
export interface I_props_Container_cNode {
    [props_Container_CNode.widthRadio_prev]: typeof props_Container_CNode_select['widthRadio'][number]['value'];
    [props_Container_CNode.widthRadio]: typeof props_Container_CNode_select['widthRadio'][number]['value'];
    [props_Container_CNode.columnNum]: typeof props_Container_CNode_select['columnNum'][number]['value'];
};