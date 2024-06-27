import type { I_CNode } from './type'
import type { T_componentCategory } from './type'

export class CNode implements I_CNode {
    readonly id: number;
    constructor(
        public parent: CNode | null,
        public next: CNode | null,
        public children: CNode[],
    ) {
        this.id = Date.now();
    }
}

export class Category extends CNode {
    componentCategory: T_componentCategory;
    constructor(
        parent: CNode | null,
        next: CNode | null,
        children: CNode[],
        componentCategory: T_componentCategory,
    ) {
        super(parent, next, children);
        this.componentCategory = componentCategory;
    }
}