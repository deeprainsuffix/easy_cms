// 可能会改

import { type CNode } from "../CNodeTree/CNode"

export const custom_eType_selectedCNodeChange = 'selectedCNodeChange'
export interface I_Detail_SelectedCNodeChange {
    selectedCNode: CNode | null;
}
