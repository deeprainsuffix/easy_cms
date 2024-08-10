import { type CNode } from "@/engine/CNodeTree/CNode";
import {
    custom_eType_selectedCNodeUpdate, type I_Detail_selectedCNodeUpdate,
    DependOnSelectedCNode, type I_Detail_SelectedCNodeChange,
} from "../dependOnSelectedCNode";
import { deepClone } from "@/lib/utils";

interface T_positionInfo {
    box: { top: number; left: number; };
    edge_borderWidth: number,
    edge_left: { width: number; height: number; top: number; left: number; };
    edge_right: { width: number; height: number; top: number; left: number; };
    edge_top: { width: number; height: number; top: number; left: number; };
    edge_bottom: { width: number; height: number; top: number; left: number; };
    tool: {
        right: number;
        where: 'top' | 'bottom';
        top: number;
    };
};

const positionInfo_default: T_positionInfo = {
    box: { top: 0, left: 0 },
    edge_borderWidth: 2,
    edge_left: { width: 0, height: 0, top: 0, left: 0 },
    edge_right: { width: 0, height: 0, top: 0, left: 0 },
    edge_top: { width: 0, height: 0, top: 0, left: 0 },
    edge_bottom: { width: 0, height: 0, top: 0, left: 0 },
    tool: {
        where: 'bottom',
        right: 0,
        top: 0,
    },
};

class CNodeSticker extends DependOnSelectedCNode {
    render: any;
    domRect: DOMRect | null;
    positionInfo: T_positionInfo;

    constructor() {
        super();
        this.domRect = null;
        this.positionInfo = deepClone(positionInfo_default);

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
        const selectedCNode = this.selectedCNode;
        if (!selectedCNode) {
            return
        }

        this.update(this.selectedCNode!);
        this.display();
    }

    private update(selectedCNode: CNode) {
        this.domRect = selectedCNode.ref.current!.getBoundingClientRect();
        this.positionInfo = deepClone(positionInfo_default);
        this.update_positionInfo();
    }

    private update_positionInfo() {
        const { left, right, top, bottom, width, height } = this.domRect!;
        const { box, edge_borderWidth, edge_left, edge_right, edge_top, edge_bottom, tool } = this.positionInfo;
        // box
        box.top = top;
        box.left = left;
        // edge
        edge_left.width = edge_borderWidth;
        edge_left.height = height + edge_borderWidth * 2;
        edge_left.top = -edge_borderWidth;
        edge_left.left = -edge_borderWidth;

        edge_right.width = edge_borderWidth;
        edge_right.height = height + edge_borderWidth * 2;
        edge_right.top = -edge_borderWidth;
        edge_right.left = width;

        edge_top.width = width + edge_borderWidth * 2;
        edge_top.height = edge_borderWidth;
        edge_top.top = -edge_borderWidth;
        edge_top.left = -edge_borderWidth;

        edge_bottom.width = width + edge_borderWidth * 2;
        edge_bottom.height = edge_borderWidth;
        edge_bottom.top = height;
        edge_bottom.left = -edge_borderWidth;
        // tool
        tool.right = -(width + edge_borderWidth);
        const tool_space_height = 40 + edge_borderWidth + edge_borderWidth / 2, clientHeight = document.body.clientHeight;
        const tool_top_default = height + edge_borderWidth + edge_borderWidth / 2;
        if (tool.where === 'bottom' && bottom + tool_space_height > clientHeight) {
            tool.top = -tool_space_height;
            tool.where = 'top';
        } else if (tool.where === 'top' && top < tool_space_height) {
            tool.top = tool_top_default;
            tool.where = 'bottom';
        } else if (tool.top === 0) {
            tool.top = tool_top_default;
        }
    }

    private reset() {
        this.domRect = null;
    }
}

export const cNodeSticker = new CNodeSticker();
// window.cNodeSticker // todo


