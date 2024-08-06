import { type CNode } from "@/engine/CNodeTree/CNode";
import {
    custom_eType_selectedCNodeUpdate, type I_Detail_selectedCNodeUpdate,
    DependOnSelectedCNode, type I_Detail_SelectedCNodeChange,
} from "../dependOnSelectedCNode";

class CNodeSticker extends DependOnSelectedCNode {
    render: any;
    domRect: DOMRect | null;

    constructor() {
        super();
        this.domRect = null;

        window.addEventListener(custom_eType_selectedCNodeUpdate, { handleEvent: this.notify_update.bind(this) });
    }

    public notify(e: CustomEvent<I_Detail_SelectedCNodeChange>) {
        const { selectedCNode } = e.detail;
        this.update_selectedCNode(selectedCNode);
        if (selectedCNode) {
            this.update(selectedCNode);
        } else {
            this.reset();
        }

        this.display();
    }

    public notify_update(e: CustomEvent<I_Detail_selectedCNodeUpdate>) {
        this.update(this.selectedCNode!);
        this.display();
    }

    private update(selectedCNode: CNode) {
        this.domRect = selectedCNode.ref.current!.getBoundingClientRect();
    }

    private reset() {
        this.domRect = null;
    }
}

export const cNodeSticker = new CNodeSticker();
// window.cNodeSticker // todo


