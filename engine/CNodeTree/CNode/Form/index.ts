import { CNode } from '..'
import type { I_CNode_cssStyle, I_CNode_props } from '../type';
import { Input_cNode_meta } from './Input_cNode';

export const Category_Form_meta = {
    componentCategory: 'form',
} as const;

export class Category_Form extends CNode {
    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
        componentName: T_componentName_form,
        title: string,
        isDraggable: boolean, isDroppable: boolean,
        props: I_CNode_props, cssStyle: I_CNode_cssStyle,
    ) {
        super(
            id, parent, pos, children,
            Category_Form_meta.componentCategory, componentName,
            title,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}

export type T_componentCategory_form = typeof Category_Form_meta.componentCategory;

export type T_componentName_form =
    typeof Input_cNode_meta.componentName
    ;