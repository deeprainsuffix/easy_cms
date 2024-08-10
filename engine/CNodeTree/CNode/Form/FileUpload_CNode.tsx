import React from 'react';
import { Category_Form, props_Form_CNode_base, type I_props_Form_CNode_base } from ".";
import { CNode } from "..";
import type { I_CNode_Concrete } from "../type";
import { FileUpload_CNode_UI } from "./FileUpload_CNode_UI";
import { FileUpload_CNode_UI_Props } from "./FileUpload_CNode_UI_Props";

export const FileUpload_cNode_meta = {
    componentName: 'file_upload',
    title: '文件上传',
    Icon_Left: () => (
        <svg className='icon_CNode_UI_Left' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4730" width="32" height="32">
            <path d="M793.6 358.4C768 227.2 652.8 128 512 128s-256 99.2-281.6 230.4C134.4 384 64 473.6 64 576c0 124.8 99.2 224 224 224h32v-64h-32c-89.6 0-160-70.4-160-160s70.4-160 160-160c0-124.8 99.2-224 224-224s224 99.2 224 224c89.6 0 160 70.4 160 160s-70.4 160-160 160h-32v64h32c124.8 0 224-99.2 224-224 0-102.4-70.4-192-166.4-217.6z" fill="currentColor" p-id="4731"></path>
            <path d="M540.8 489.6c-12.8-9.6-25.6-12.8-38.4-6.4-3.2 0-6.4 3.2-9.6 6.4l-96 92.8c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 35.2 12.8 48 0l38.4-35.2v272c0 19.2 16 32 32 32 19.2 0 32-16 32-32V592l38.4 35.2c12.8 12.8 35.2 12.8 48 0 12.8-12.8 12.8-32 0-44.8l-92.8-92.8z" fill="currentColor" p-id="4732"></path>
        </svg>
    )
} as const;

export const props_FileUpload_CNode = Object.assign({}, props_Form_CNode_base);
export interface I_props_Form_CNode extends I_props_Form_CNode_base { }

interface I_props_FileUpload_cNode extends I_props_Form_CNode { }

export interface I_FileUpload_CNode extends I_CNode_Concrete {
    componentName: typeof FileUpload_cNode_meta['componentName'];
    title: typeof FileUpload_cNode_meta['title'];
    props: I_props_FileUpload_cNode;
}

export class FileUpload_CNode extends Category_Form implements I_FileUpload_CNode {
    componentName: I_FileUpload_CNode['componentName'];
    title: I_FileUpload_CNode['title'];
    props: I_FileUpload_CNode['props'];
    cssStyle: I_FileUpload_CNode['cssStyle'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
    ) {
        const isDraggable = true, isDroppable = true;
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentName = FileUpload_cNode_meta.componentName;
        this.title = FileUpload_cNode_meta.title;
        this.props = {
            [props_FileUpload_CNode.fieldKey]: `field-${id}`,
            [props_FileUpload_CNode.fieldLabel]: `字段-${id}`,
            [props_FileUpload_CNode.fieldPlaceholder]: '选择文件',
        };
        this.cssStyle = {};
    }
}

FileUpload_CNode.prototype.CNode_UI = FileUpload_CNode_UI;
FileUpload_CNode.prototype.CNode_UI_props = FileUpload_CNode_UI_Props;