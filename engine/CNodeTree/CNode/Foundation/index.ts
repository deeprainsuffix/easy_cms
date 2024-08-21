import { CNode } from '../index'
import type { I_CNode_Category } from '../type';
import { Category_Foundation_meta } from './index.meta';

export interface I_Category_Foundation extends I_CNode_Category {
    componentCategory: typeof Category_Foundation_meta['componentCategory'];
}

export abstract class Category_Foundation extends CNode implements I_Category_Foundation {
    componentCategory: I_Category_Foundation['componentCategory'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
        isDraggable: boolean, isDroppable: boolean,
    ) {
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentCategory = Category_Foundation_meta.componentCategory
    }
}