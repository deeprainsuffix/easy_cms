import { Category_Form } from ".";
import type { I_CNode } from "../index.type";
import { FileUpload_CNode_UI } from "./FileUpload_CNode.UI";
import { FileUpload_CNode_UI_Props } from "./FileUpload_CNode.UI.Props";
import { FileUpload_cNode_meta, FileUpload_CNode_props_key, type I_FileUpload_cNode_props } from './FileUpload_CNode.meta';

export interface I_FileUpload_CNode extends I_CNode {
    componentName: typeof FileUpload_cNode_meta['componentName'];
    title: typeof FileUpload_cNode_meta['title'];
    props: I_FileUpload_cNode_props;
}

export class FileUpload_CNode extends Category_Form implements I_FileUpload_CNode {
    componentName: I_FileUpload_CNode['componentName'];
    title: I_FileUpload_CNode['title'];
    props: I_FileUpload_CNode['props'];
    cssStyle: I_FileUpload_CNode['cssStyle'];
    cssStyle_default: I_FileUpload_CNode['cssStyle_default'];

    constructor(
        id: I_CNode['id'], parent: I_CNode['parent'], pos: I_CNode['pos'], children: I_CNode['children'],
    ) {
        const isDraggable = true, isDroppable = true;
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentName = FileUpload_cNode_meta.componentName;
        this.title = FileUpload_cNode_meta.title;
        this.props = {
            [FileUpload_CNode_props_key.fieldKey]: `field-${id}`,
            [FileUpload_CNode_props_key.fieldLabel]: `字段-${id}`,
            [FileUpload_CNode_props_key.fieldPlaceholder]: '选择文件',
        };
        this.cssStyle = {};
        this.cssStyle_default = { ...this.cssStyle };
    }

    get CNode_UI() {
        return FileUpload_CNode_UI
    }

    get CNode_UI_Props() {
        return FileUpload_CNode_UI_Props
    }
}