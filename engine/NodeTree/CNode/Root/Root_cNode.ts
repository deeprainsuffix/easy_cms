import { Category_Root } from ".";
import { CNode } from "..";
import { E_componentName_root } from "../type";
import { Root_active } from "./Root_active";

export class Root_cNode extends Category_Root {
    constructor(
        parent: CNode | null, next: CNode | null, children: CNode[],
    ) {
        super(parent, next, children, E_componentName_root.root);
    }
}

Root_cNode.prototype.ReactComponentFunc = Root_active;