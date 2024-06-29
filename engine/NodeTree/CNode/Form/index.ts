import { CNode, ComponentCategory } from '..'
import { E_componentCategory } from '../type';
import type { E_componentName_form, I_CNode_cssStyle, I_CNode_props } from '../type';

export const Category_Form_meta = {
    componentCategory: E_componentCategory.form,
}

export class Category_Form extends ComponentCategory {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
        componentCategory: keyof typeof E_componentCategory, componentName: keyof typeof E_componentName_form,
        title: string,
        isDraggable: boolean, isDroppable: boolean,
        props: I_CNode_props, cssStyle: I_CNode_cssStyle,
    ) {
        super(
            parent, next, children,
            componentCategory, componentName,
            title,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}