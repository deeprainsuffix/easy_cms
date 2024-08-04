import { CNode } from '..'
import type { I_CNode_Category } from '../type';

export const Category_Form_meta = {
    componentCategory: 'form',
} as const;

export interface I_Category_Form extends I_CNode_Category {
    componentCategory: typeof Category_Form_meta['componentCategory'];
}

export abstract class Category_Form extends CNode implements I_Category_Form {
    componentCategory: I_Category_Form['componentCategory'];

    constructor(
        id: string, parent: CNode | null, pos: number, children: (CNode | null)[],
        isDraggable: boolean, isDroppable: boolean,
    ) {
        super(
            id, parent, pos, children,
            isDraggable, isDroppable,
        );

        this.componentCategory = Category_Form_meta.componentCategory;
    }

}

export const props_Form_CNode_base = {
    fieldKey: 'fieldKey',
    fieldLabel: 'fieldLabel',
    fieldPlaceholder: 'fieldPlaceholder',
    // fieldValue: any; // 类型由fieldValueType决定
    // fieldValueType: 'undefined' | 'null' | 'string' | 'number' | 'boolean' | 'array' | 'object';
} as const;
export interface I_props_Form_CNode_base {
    [props_Form_CNode_base.fieldKey]: string;
    [props_Form_CNode_base.fieldLabel]: string;
    [props_Form_CNode_base.fieldPlaceholder]: string;
}