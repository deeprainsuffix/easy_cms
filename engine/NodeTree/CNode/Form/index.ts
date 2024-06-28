import { CNode, ComponentCategory } from '..'
import { E_componentCategory } from '../type';
import type { E_componentName_form } from '../type';

export class Category_Form extends ComponentCategory {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
        componentName: keyof typeof E_componentName_form,
    ) {
        super(
            parent, next, children,
            E_componentCategory.form, componentName,
        );
    }
}