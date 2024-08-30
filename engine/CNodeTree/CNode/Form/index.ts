import { CNode_base } from '..'
import type { I_CNode, I_CNode_Category } from '../index.type';
import { Category_Form_meta } from './index.meta';

export interface I_Category_Form extends I_CNode_Category {
    componentCategory: typeof Category_Form_meta['componentCategory'];
}

export abstract class Category_Form extends CNode_base implements I_Category_Form {
    componentCategory: I_Category_Form['componentCategory'];

    constructor(
        id: I_CNode['id'], parent: I_CNode['parent'], pos: I_CNode['pos'], children: I_CNode['children'],
    ) {
        super(
            id, parent, pos, children,
        );

        this.componentCategory = Category_Form_meta.componentCategory;
    }

}