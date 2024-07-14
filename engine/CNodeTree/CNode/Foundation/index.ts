import { CNode } from '../index'
import type { I_CNode_cssStyle, I_CNode_props } from '../type';
import { Root_cNode_meta } from './Root_cNode';

export const Category_Foundation_meta = {
    componentCategory: 'foundation',
} as const;

export class Category_Foundation extends CNode {
    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
        componentName: T_componentName_foundation,
        title: string,
        isDraggable: boolean, isDroppable: boolean,
        props: I_CNode_props, cssStyle: I_CNode_cssStyle,
    ) {
        super(
            id, parent, pos, children,
            Category_Foundation_meta.componentCategory, componentName,
            title,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}

export type T_componentCategory_foundation = typeof Category_Foundation_meta.componentCategory;

export type T_componentName_foundation =
    typeof Root_cNode_meta.componentName
    ;