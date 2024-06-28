import { CNode, ComponentCategory } from '../index'
import { E_componentCategory } from '../type';
import type { E_componentName_root } from '../type';

export class Category_Root extends ComponentCategory {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
        componentName: keyof typeof E_componentName_root,
    ) {
        super(
            parent, next, children,
            E_componentCategory.root, componentName,
        );
    }
}