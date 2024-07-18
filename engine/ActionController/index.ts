import { ActionCNode_collection, T_ActionCNode, T_ActionCNode_Props } from "./ActiocCNode";
import { T_ActionTip_Props, T_ActionTip, ActionTip_collection } from "./ActiocTip";
import { actionCNode_Factory } from "./ActionCNode_Factory";
import { actionTip_Factory } from "./ActionTip_Factory";
import { cNodeTree } from "../CNodeTree";

// export const
//     source_TimeTravel = 'TimeTravel',
//     source_CNodeTree_Left = 'CNodeTree_Left',
//     source_CNodeTree_Center = 'CNodeTree_Center',
//     source_Updater_Right = 'Updater_Right',
//     source_CNode_Sticker = 'CNode_Sticker';

interface T_options { // todo
    // source: 
}

interface I_ActionController {
    dispatchAction: (actionProps: T_ActionCNode_Props | T_ActionTip_Props, options: T_options) => void;
    // transferActionCNode: (action: T_ActionCNode) => void;
    // transferActionTip: (action: T_ActionTip) => void;
}

export class ActionController implements I_ActionController {
    constructor() {

    }

    // 所有action入口
    public dispatchAction(actionProps: T_ActionCNode_Props | T_ActionTip_Props, options?: T_options) {
        let result = {} as T_ActionCNode | T_ActionTip;

        if (isActionCNodeProps(actionProps)) {
            result = actionCNode_Factory.do(actionProps);
            this.transferActionCNode(result);
        } else {
            result = actionTip_Factory.createActionTip(actionProps);
            this.transferActionTip(result);
        }

        return
    }

    private transferActionCNode(action: T_ActionCNode) {
        cNodeTree.receiveActionCNode(action);
    }

    private transferActionTip(action: T_ActionTip) {
        cNodeTree.receiveActionTip(action);
    }
}

// 这两个推断条件 todo
function isActionCNodeProps(props: T_ActionCNode_Props | T_ActionTip_Props): props is T_ActionCNode_Props {
    if (props.type in ActionCNode_collection) {
        return true
    }

    return false
}

function isActionTipProps(props: T_ActionCNode_Props | T_ActionTip_Props): props is T_ActionTip_Props {
    if (props.type in ActionTip_collection) {
        return true
    }

    return false
}

export const actionController = new ActionController();
// window.actionController = new ActionController(); // todo