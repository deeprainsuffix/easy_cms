import type { T_CNode_Concrete } from "../CNodeTree/CNode/index.type";

interface I_DependOnSelectedCNode {
    selectedCNode: T_CNode_Concrete | null;
}

/**
 * 像CNodeSticker、SettingProps、SettingCssStyle这些都是强依赖selectedCNode的
 * 这里用浏览器自定义事件处理一下，配合CNodeTree。
 * 后续如果有更多需要通知的事件，可能会改 todo
 */
export abstract class DependOnSelectedCNode implements I_DependOnSelectedCNode {
    abstract render: any;
    selectedCNode: I_DependOnSelectedCNode['selectedCNode'];

    constructor() {
        this.selectedCNode = null;

        window.addEventListener(custom_eType_selectedCNodeChange, { handleEvent: this.notify.bind(this) });
    }

    public abstract notify(e: CustomEvent<I_Detail_SelectedCNodeChange>): any;

    protected update_selectedCNode(selectedCNode: I_DependOnSelectedCNode['selectedCNode']) {
        if (!selectedCNode) {
            this.reset_selectedCNode();
            return
        }

        this.selectedCNode = selectedCNode;
    }

    private reset_selectedCNode() {
        this.selectedCNode = null;
    }

    protected display() {
        this.render();
    }
}

export const custom_eType_selectedCNodeChange = 'selectedCNodeChange';
export interface I_Detail_SelectedCNodeChange {
    selectedCNode: T_CNode_Concrete | null;
}

export const custom_eType_selectedCNodeUpdate = 'selectedCNodeUpdate';
export interface I_Detail_selectedCNodeUpdate { }
