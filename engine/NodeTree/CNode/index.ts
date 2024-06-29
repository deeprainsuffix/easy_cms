import type { I_CNode, I_CNode_cssStyle, I_CNode_props, T_componentCategory, T_ComponentName } from './type'

let id = 0; // id发生器 todo

export class CNode implements I_CNode {
    readonly id: number;
    ReactComponentFunc: any; // React的函数组件 todo，这里的定义其实是错的，因为这个属性在具体CNode类的原型上，但最终使用的一定是具体的cNode

    constructor(
        public parent: CNode | null, public next: CNode | null, public children: CNode[],
        public componentCategory: T_componentCategory, public componentName: T_ComponentName,
        public isDraggable: boolean, public isDroppable: boolean,
        public props: I_CNode_props, public cssStyle: I_CNode_cssStyle,
    ) {
        this.id = ++id;
    }
}


// 这个类后续考虑要不要去掉
export class ComponentCategory extends CNode {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
        componentCategory: T_componentCategory, componentName: T_ComponentName,
        isDraggable: boolean, isDroppable: boolean,
        props: I_CNode_props, cssStyle: I_CNode_cssStyle,
    ) {
        super(
            parent, next, children,
            componentCategory, componentName,
            isDraggable, isDroppable,
            props, cssStyle,
        );
    }
}