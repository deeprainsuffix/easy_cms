import { CNode, Category } from '../index'
import { componentCategory } from '../type';
import type { T_ComponentName } from '../type';

class Category_Layout extends Category {
    constructor(
        parent: CNode | null,
        next: CNode | null,
        children: CNode[],
    ) {
        super(parent, next, children, componentCategory.layout);
    }
}

class Component_Layout extends Category_Layout {
    componentName: T_ComponentName[componentCategory.layout]
    constructor(
        parent: CNode | null,
        next: CNode | null,
        children: CNode[],
        componentName: T_ComponentName[componentCategory.layout]
    ) {
        super(parent, next, children);
        this.componentName = componentName;
    }
}