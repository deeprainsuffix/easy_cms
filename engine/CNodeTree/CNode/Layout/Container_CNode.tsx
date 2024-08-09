import React from 'react';
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
    Icon_Left: () => (
        <svg className='icon_CNode_UI_Left' viewBox="0 0 2048 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8867" width="32" height="32">
            <path d="M2048 32v44.501333h-21.333333V32a10.666667 10.666667 0 0 0-10.666667-10.666667H2005.333333V0h10.666667A32 32 0 0 1 2048 32z m0 87.168v85.333333h-21.333333v-85.333333h21.333333z m0 128v85.333333h-21.333333v-85.333333h21.333333z m0 128v85.333333h-21.333333v-85.333333h21.333333z m0 128v85.333333h-21.333333v-85.333333h21.333333z m0 128v85.333333h-21.333333v-85.333333h21.333333z m0 128v85.333333h-21.333333v-85.333333h21.333333z m0 128v85.333333h-21.333333v-85.333333h21.333333zM2022.997333 1024h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-128 0h-85.333333v-21.333333h85.333333v21.333333z m-204.458666-0.469333l-10.517334-1.813334 3.626667-21.013333 10.517333 1.813333A10.794667 10.794667 0 0 0 32 1002.666667h70.997333v21.333333H32c-1.834667 0-3.669333-0.149333-5.461333-0.469333zM0 965.184v-85.333333h21.333333v85.333333H0z m0-128v-85.333333h21.333333v85.333333H0z m0-128v-85.333333h21.333333v85.333333H0z m0-128v-85.333333h21.333333v85.333333H0z m0-128v-85.333333h21.333333v85.333333H0z m0-128v-85.333333h21.333333v85.333333H0z m0-128v-85.333333h21.333333v85.333333H0zM32 0h17.984v21.333333H32a10.666667 10.666667 0 0 0-10.666667 10.666667v37.184H0V32A32 32 0 0 1 32 0z m60.650667 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z m128 0h85.333333v21.333333h-85.333333V0z" fill="currentColor" p-id="8868"></path>
            <path d="M559.530667 149.333333v725.333334H170.666667V149.333333h388.864zM991.573333 149.333333v725.333334H602.730667V149.333333h388.864z m432.064 0v725.333334H1034.794667V149.333333h388.864zM1877.333333 149.333333v725.333334H1466.88V149.333333H1877.333333z" fill="currentColor" p-id="8869"></path>
        </svg>
    ),
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
            [props_Container_CNode.columnNum_prev]: '2',
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
}

Container_CNode.prototype.CNode_UI = Container_CNode_UI;
Container_CNode.prototype.CNode_UI_props = Container_CNode_UI_Props;

export const props_Container_CNode = {
    widthRadio: 'widthRadio',
    widthRadio_prev: 'widthRadio_prev',
    columnNum: 'columnNum',
    columnNum_prev: 'columnNum_prev',
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
    [props_Container_CNode.widthRadio]: typeof props_Container_CNode_select['widthRadio'][number]['value'];
    [props_Container_CNode.widthRadio_prev]: typeof props_Container_CNode_select['widthRadio'][number]['value'];
    [props_Container_CNode.columnNum]: typeof props_Container_CNode_select['columnNum'][number]['value'];
    [props_Container_CNode.columnNum_prev]: typeof props_Container_CNode_select['columnNum'][number]['value'];
};