import { type CNode } from "@/engine/CNodeTree/CNode";
import { custom_eType_selectedCNodeChange, I_Detail_SelectedCNodeChange } from "..";

interface I_CNodeSticker {
    selectedCNode: CNode | null;
}

class CNodeSticker implements I_CNodeSticker {
    render: any;
    selectedCNode: CNode | null;
    domRect: DOMRect | null;

    constructor() {
        this.selectedCNode = null;
        this.domRect = null;

        window.addEventListener(custom_eType_selectedCNodeChange, { handleEvent: this.notify.bind(this) });
    }

    public notify(e: CustomEvent<I_Detail_SelectedCNodeChange>) {
        const { selectedCNode } = e.detail;
        console.log('selectedCNode:', selectedCNode);
        if (selectedCNode) {
            this.update(selectedCNode);
        } else {
            this.reset();
        }

        this.display();
    }

    private update(selectedCNode: CNode) {
        this.selectedCNode = selectedCNode
        this.domRect = this.selectedCNode.ref.current!.getBoundingClientRect();
    }

    private reset() {
        this.selectedCNode = null;
        this.domRect = null;
    }

    private display() {
        this.render();
    }
}

export const cNodeSticker = new CNodeSticker();
// window.cNodeSticker // todo


