import { CNode, ComponentCategory } from '../index'
import { E_componentCategory } from '../type';
import type { E_componentName_layout, I_CNode_cssStyle, I_CNode_props } from '../type';

export class Category_Layout extends ComponentCategory {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
        componentName: keyof typeof E_componentName_layout,
        isDraggable: boolean, isDroppable: boolean,
        props: I_CNode_props, cssStyle: I_CNode_cssStyle,
    ) {
        super(
            parent, next, children,
            E_componentCategory.layout, componentName,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}