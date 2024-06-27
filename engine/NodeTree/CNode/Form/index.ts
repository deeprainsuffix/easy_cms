
import { CNode, Category } from '../index'
import { componentCategory } from '../type';
import type { T_ComponentName } from '../type';

class Category_Form extends Category {
    constructor(
        parent: CNode | null,
        next: CNode | null,
        children: CNode[],
    ) {
        super(parent, next, children, componentCategory.form);
    }
}

class Component_Form extends Category_Form {
    componentName: T_ComponentName[componentCategory.form]
    constructor(
        parent: CNode | null,
        next: CNode | null,
        children: CNode[],
        componentName: T_ComponentName[componentCategory.form]
    ) {
        super(parent, next, children);
        this.componentName = componentName;
    }
}