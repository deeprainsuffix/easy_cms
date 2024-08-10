import React from 'react';
import { Category_Foundation } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../type";
import { Root_CNode_UI } from "./Root_CNode_UI";
import { Root_CNode_UI_Props } from "./Root_CNode_UI_Props";

export const Root_cNode_meta = {
    componentName: 'root',
    title: '根',
    Icon_Left: () => (
        <svg className='icon_CNode_UI_Left' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15515" id="mx_n_1723196036822" width="32" height="32">
            <path d="M513.6 417.1c41.5-23 83.2-45.6 124.6-69 14.6-8.3 26.5-7.4 38.8 4.6 17.4 16.9 37.6 29.7 60.5 38.1 112.8 41.2 235.6-54.1 223.7-173.5-9.9-99-99.7-169.2-196.2-153.4C673 79 611.4 167.2 627.7 260.7c4.4 25.4 3.1 28.1-19.6 40.6-39.2 21.7-78.4 43.3-117.6 64.9-21.2 11.7-26.3 10.9-42.7-6.8-62.5-67.5-159.4-89.9-245-56.6-84.6 32.9-140.4 115-140.4 206.6 0 101.9 67.3 190.5 165.9 215.2 78.8 19.8 148.8 0.2 209-54.1 11.1-10 21.1-15.5 35.3-6.2 46.8 30.8 93.8 61.2 140.7 91.7 13.8 9 18.4 21.2 15.1 37.1-2.7 13-4.7 26.3-3.4 39.7 7.5 80.1 72.3 134.5 154.6 127.5 52.4-4.5 92-31.5 113.3-79.7 20.9-47.3 19-95.1-11.7-138.4-45.3-63.9-124.9-80.1-190.9-37.5-21.6 13.9-36.9 12.8-57.2-1.5-41.8-29.5-85.2-56.8-128.5-84.1-14.3-9-18-18.6-11.7-34.4 17-43 18.8-87.1 6.1-131.7-6.4-21.6-4.7-25.2 14.6-35.9z m280.1-298c62.4 0.5 111.6 50.1 111.5 112.2-0.1 62.5-49.2 111.4-111.9 111.4-63.2 0.1-113-49.7-112.6-112.6 0.4-61.6 51.2-111.5 113-111z m-28.1 618.6c46 0.8 84.7 40.2 84 85.6-0.7 45.1-39.6 82.8-85 82.4-46.5-0.4-84.5-39-83.8-85.1 0.7-44.9 40.4-83.7 84.8-82.9z" fill="currentColor" p-id="15516"></path>
        </svg>
    ),
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
        this.props = {};
        this.cssStyle = {};
    }
}

Root_CNode.prototype.CNode_UI = Root_CNode_UI;
Root_CNode.prototype.CNode_UI_props = Root_CNode_UI_Props;