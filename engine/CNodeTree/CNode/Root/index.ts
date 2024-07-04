import { CNode, ComponentCategory } from '../index'
import { E_componentCategory } from '../type';
import type { E_componentName_root, I_CNode_cssStyle, I_CNode_props } from '../type';

export const Category_Root_meta = {
    componentCategory: E_componentCategory.root,
}

export class Category_Root extends ComponentCategory {
    constructor(
        id: string, parent: CNode | null, next: CNode | null, children: CNode[],
        componentCategory: keyof typeof E_componentCategory, componentName: keyof typeof E_componentName_root,
        title: string,
        isDraggable: boolean, isDroppable: boolean,
        props: I_CNode_props, cssStyle: I_CNode_cssStyle,
    ) {
        super(
            id, parent, next, children,
            componentCategory, componentName,
            title,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}