import { DependOnSelectedCNode, I_Detail_SelectedCNodeChange } from "../dependOnSelectedCNode";

class SettingProps extends DependOnSelectedCNode {
    render: any;

    constructor() {
        super();
    }

    public notify(e: CustomEvent<I_Detail_SelectedCNodeChange>) {
        const { selectedCNode } = e.detail;
        this.update_selectedCNode(selectedCNode);
    }
}

export const settingProps = new SettingProps();