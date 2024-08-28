import { DependOnSelectedCNode, I_Detail_SelectedCNodeChange } from "../dependOnSelectedCNode";

export const
    tab_SettingProps = 'SettingProps',
    tab_SettingCssStyle = 'SettingCssStyle';

export interface I_SettingRight {
    tab: typeof tab_SettingProps | typeof tab_SettingCssStyle;
}
class SettingRight extends DependOnSelectedCNode implements I_SettingRight {
    render: any;
    tab: I_SettingRight['tab'];

    constructor() {
        super();
        this.tab = tab_SettingProps;
    }

    public notify(e: CustomEvent<I_Detail_SelectedCNodeChange>) {
        const { selectedCNode } = e.detail;
        this.update_selectedCNode(selectedCNode);

        this.tab = tab_SettingProps;
        this.display();
    }

    public changeTab(tab: I_SettingRight['tab']) {
        this.tab = tab;
        this.display();
    }

}

export const settingRight = new SettingRight();