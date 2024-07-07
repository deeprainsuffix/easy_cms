import { ActionCNode_collection } from "./ActiocCNode/ActionCNode_collection";
import { ActionTip_collection } from "./ActiocTip/ActionTip_collection";
import type { T_ActionCNode, T_ActionCNode_Props } from "./ActiocCNode/type";
import type { T_ActionTip, T_ActionTip_Props } from "./ActiocTip/type";
import { actionCNode_Factory } from "./ActionCNode_Factory";
import { actionTip_Factory } from "./ActionTip_Factory";

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
    transferAction: (action: T_ActionCNode | T_ActionTip) => void; // todo
}

export class ActionController implements I_ActionController {
    constructor() {

    }

    dispatchAction(actionProps: T_ActionCNode_Props | T_ActionTip_Props, options: T_options) {
        let result = {} as T_ActionCNode | T_ActionTip;

        if (isActionCNodeProps(actionProps)) {
            result = actionCNode_Factory.do(actionProps);
        } else {
            result = actionTip_Factory.createActionTip(actionProps);
        }

        this.transferAction(result);
        return
    }

    transferAction(action: T_ActionCNode | T_ActionTip) { }
}

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