import { CNode } from '..'
import { E_componentCategory } from '../type';
import type { E_componentName_form, I_CNode_cssStyle, I_CNode_props } from '../type';

export const Category_Form_meta = {
    componentCategory: E_componentCategory.form,
} as const;

export class Category_Form extends CNode {
    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
        componentCategory: E_componentCategory.form, componentName: keyof typeof E_componentName_form,
        title: string,
        isDraggable: boolean, isDroppable: boolean,
        props: I_CNode_props, cssStyle: I_CNode_cssStyle,
    ) {
        super(
            id, parent, pos, children,
            componentCategory, componentName,
            title,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}