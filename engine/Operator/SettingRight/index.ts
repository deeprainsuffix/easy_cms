import { DependOnSelectedCNode, I_Detail_SelectedCNodeChange } from "../dependOnSelectedCNode";

class SettingRight extends DependOnSelectedCNode {
    render: any;

    constructor() {
        super();
    }

    public notify(e: CustomEvent<I_Detail_SelectedCNodeChange>) {
        const { selectedCNode } = e.detail;
        this.update_selectedCNode(selectedCNode);

        this.display();
    }
}

export const settingRight = new SettingRight();