import { CNode, ComponentCategory } from '../index'
import { E_componentCategory } from '../type';
import type { E_componentName_layout } from '../type';

export class Category_Layout extends ComponentCategory {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
        componentName: keyof typeof E_componentName_layout,
    ) {
        super(
            parent, next, children,
            E_componentCategory.layout, componentName,
        );
    }
}