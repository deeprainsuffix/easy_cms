import type { I_CNode_base, I_CNode } from './index.type'

export const lifeCycle_afterDomMounted = 'afterDomMounted';
export const lifeCycle_afterDomUpdated = 'afterDomUpdated';

export abstract class CNode_base implements I_CNode_base {
    public id: I_CNode_base['id'];
    public parent: I_CNode_base['parent'];
    public pos: I_CNode_base['pos'];
    public children: I_CNode_base['children'];
    public ref: I_CNode_base['ref'];
    public render: I_CNode_base['render'];
    abstract componentCategory: I_CNode['componentCategory'];
    abstract componentName: I_CNode['componentName'];
    abstract title: I_CNode['title'];
    abstract isDraggable: I_CNode['isDraggable'];
    abstract isDroppable: I_CNode['isDroppable'];
    abstract isDropTarget: I_CNode['isDropTarget'];
    abstract props: I_CNode['props'];
    abstract cssStyle: I_CNode['cssStyle'];
    abstract cssStyle_default: I_CNode['cssStyle_default'];

    private afterDomMounted: Function[]; // 在组件Mount之后执行，只执行一次，队列清空，清空工作交给TreePlanting进行
    private afterDomUpdated: Function[]; // 在组件更新之后执行，清空工作交给TreePlanting进行

    constructor(
        id: I_CNode['id'], parent: I_CNode['parent'], pos: I_CNode['pos'], children: I_CNode['children'],
    ) {
        this.id = id;
        this.parent = parent;
        this.pos = pos;
        this.children = children;

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