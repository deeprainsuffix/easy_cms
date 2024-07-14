import type { I_CNode, I_CNode_cssStyle, I_CNode_props, T_componentCategory, T_ComponentName } from './type'



export class CNode implements I_CNode {
    ReactComponentFuncActive: any; // React的函数组件 todo，这里的定义是错的，这个属性在具体CNode类的原型上，但最终使用的一定是具体的cNode
    render: any; // 组件刷新句柄 todo 这里的定义是错的，这个属性在react组件生成时添加

    constructor(
        public id: string, public parent: CNode | null, public pos: number, public children: (CNode | null)[],
        public componentCategory: T_componentCategory, public componentName: T_ComponentName,
        public title: string,
        public isDraggable: boolean, public isDroppable: boolean,
        public props: I_CNode_props, public cssStyle: I_CNode_cssStyle,
    ) {
    }
}