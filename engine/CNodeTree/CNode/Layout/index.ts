import { CNode } from '../index'
import type { I_CNode_cssStyle, I_CNode_props } from '../type';
import { Container_cNode_meta } from './container_cNode';

export const Category_Layout_meta = {
    componentCategory: 'layout',
} as const;

export class Category_Layout extends CNode {
    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
        componentName: T_componentName_layout,
        title: string,
        isDraggable: boolean, isDroppable: boolean,
        props: I_CNode_props, cssStyle: I_CNode_cssStyle,
    ) {
        super(
            id, parent, pos, children,
            Category_Layout_meta.componentCategory, componentName,
            title,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}

export type T_componentCategory_layout = typeof Category_Layout_meta.componentCategory;

export type T_componentName_layout =
    typeof Container_cNode_meta.componentName
    ;