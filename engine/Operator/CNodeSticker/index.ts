import { type CNode } from "@/engine/CNodeTree/CNode";
import { DependOnSelectedCNode, type I_Detail_SelectedCNodeChange } from "../dependOnSelectedCNode";

class CNodeSticker extends DependOnSelectedCNode {
    render: any;
    domRect: DOMRect | null;

    constructor() {
        super();
        this.domRect = null;
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

    private update(selectedCNode: CNode) {
        this.domRect = selectedCNode.ref.current!.getBoundingClientRect();
    }

    private reset() {
        this.domRect = null;
    }
}

export const cNodeSticker = new CNodeSticker();
// window.cNodeSticker // todo


