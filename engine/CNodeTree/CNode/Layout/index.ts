import { CNode } from '../index'
import type { I_CNode_Category } from '../index.type';
import { Category_Layout_meta } from './index.meta';

export interface I_Category_Layout extends I_CNode_Category {
    componentCategory: typeof Category_Layout_meta['componentCategory'];
}

export abstract class Category_Layout extends CNode implements I_Category_Layout {
    componentCategory: I_Category_Layout['componentCategory'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
        isDraggable: boolean, isDroppable: boolean,
    ) {
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentCategory = Category_Layout_meta.componentCategory;
    }
}