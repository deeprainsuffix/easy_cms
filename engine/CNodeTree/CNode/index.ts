import type { RefObject } from 'react';
import type { I_CNode, I_CNode_cssStyle, I_CNode_props, T_componentCategory, T_ComponentName, T_CNode_Concrete } from './index.type'

export const lifeCycle_afterDomMounted = 'afterDomMounted';
export const lifeCycle_afterDomUpdated = 'afterDomUpdated';

export abstract class CNode implements I_CNode {
    public ref: RefObject<HTMLDivElement> // 传递给ref，标记真实DOM，作为实例的具体属性
    public render: any; // 组件刷新句柄 todo 这里的定义是错的，这个属性在react组件生成时添加，作为实例的具体属性
    private afterDomMounted: Function[]; // 在组件Mount之后执行，只执行一次，队列清空，清空工作交给TreePlanting进行
    private afterDomUpdated: Function[]; // 在组件更新之后执行，清空工作交给TreePlanting进行

    abstract componentCategory: T_componentCategory;
    abstract componentName: T_ComponentName;
    abstract title: string;
    abstract props: I_CNode_props;
    abstract cssStyle: I_CNode_cssStyle;

    constructor(
        public id: string, public parent: CNode | null, public pos: number, public children: (CNode | null)[],
        public isDraggable: boolean, public isDroppable: boolean,
    ) {
        this.ref = { current: null };
        this.afterDomMounted = [];
        this.afterDomUpdated = [];
    }

    public lifeCycleRegister(liftCycle: T_liftCycle, callback: Function, options?: {}) {
        switch (liftCycle) {
            case lifeCycle_afterDomMounted:
                this.afterDomMounted.push(callback);
                break;
            case lifeCycle_afterDomUpdated:
                this.afterDomUpdated.push(callback);
                break;
        }
    }

    // lifeCycleUnregister todo

    public lifeCycleRun(liftCycle: T_liftCycle) {
        switch (liftCycle) {
            case lifeCycle_afterDomMounted:
                this.afterDomMounted.forEach(cb => cb());
                this.lifeCycleClear(liftCycle);
                break;
            case lifeCycle_afterDomUpdated:
                this.afterDomUpdated.forEach(cb => cb());
                break;
        }
    }

    public lifeCycleClear(liftCycle: T_liftCycle) {
        switch (liftCycle) {
            case lifeCycle_afterDomMounted:
                this.afterDomMounted.length = 0;
                break;
        }
    }
}

type T_liftCycle =
    typeof lifeCycle_afterDomMounted |
    typeof lifeCycle_afterDomUpdated
    ;