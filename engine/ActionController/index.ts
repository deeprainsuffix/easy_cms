import { ActionCNode_collection, T_ActionCNode, T_ActionCNode_Required } from "./ActionCNode";
import { actionCNode_Factory } from "./ActionCNode/factory";
import { ActionTip_collection, T_ActionTip, T_ActionTip_Required } from "./ActionTip";
import { actionTip_Factory } from "./ActionTip/factory";
import { ActionCNodeProps_collection, T_ActionCNodeProps, T_ActionCNodeProps_Required } from "./ActionCNodeProps";
import { actionCNodeProps_Factory } from "./ActionCNodeProps/factory";
import { cNodeTree } from "../CNodeTree";
import { timeTravel } from "../TimeTravel";

// export const
//     source_TimeTravel = 'TimeTravel',
//     source_CNodeTree_Left = 'CNodeTree_Left',
//     source_CNodeTree_Center = 'CNodeTree_Center',
//     source_Updater_Right = 'Updater_Right',
//     source_CNode_Sticker = 'CNode_Sticker';

type T_actionRequired =
    T_ActionCNode_Required
    | T_ActionTip_Required |
    T_ActionCNodeProps_Required
    ;

interface T_options { // todo
    // source: 
}

interface I_ActionController {
    dispatchAction: (actionRequired: T_actionRequired, options: T_options) => void;
}

/**
 * ActionController与TImeTravel是强耦合的
 */
export class ActionController implements I_ActionController {
    constructor() {

    }

    private transferActionCNode(action: T_ActionCNode) {
        cNodeTree.receiveActionCNode(action);
        this.notifyTimeTravel();
    }

    private transferActionTip(action: T_ActionTip) {
        cNodeTree.receiveActionTip(action);
    }

    private transferActionCNodeProps(action: T_ActionCNodeProps) {
        cNodeTree.receiveActionCNodeProps(action);
    }

    private notifyTimeTravel() {
        timeTravel.notify(actionCNode_Factory.getUndoStackSize(), actionCNode_Factory.getRedoStackSize());
    }

    // 除undo、redo，所有action入口
    public dispatchAction(
        actionRequired:
            T_ActionCNode_Required |
            T_ActionTip_Required |
            T_ActionCNodeProps_Required,
        options?: T_options
    ) {
        let action = {} as T_ActionCNode | T_ActionTip | T_ActionCNodeProps;

        if (isActionCNodeRequired(actionRequired)) {
            action = actionCNode_Factory.do(actionRequired);
            this.transferActionCNode(action);
        } else if (isActionTipRequired(actionRequired)) {
            action = actionTip_Factory.createActionTip(actionRequired);
            this.transferActionTip(action);
        } else if (isActionCNodePropsRequired(actionRequired)) {
            action = actionCNodeProps_Factory.createActionCNodeProps(actionRequired);
            this.transferActionCNodeProps(action);
        }

        return
    }

    public dispatchUndo() {
        const action = actionCNode_Factory.undo();
        if (!action) {
            return
        }

        this.transferActionCNode(action);
    }

    public dispatchRedo() {
        const action = actionCNode_Factory.redo();
        if (!action) {
            return
        }

        this.transferActionCNode(action);
    }
}

function isActionCNodeRequired(actionRequired: T_actionRequired): actionRequired is T_ActionCNode_Required {
    if (actionRequired.type in ActionCNode_collection) {
        return true
    }

    return false
}

function isActionTipRequired(actionRequired: T_actionRequired): actionRequired is T_ActionTip_Required {
    if (actionRequired.type in ActionTip_collection) {
        return true
    }

    return false
}

function isActionCNodePropsRequired(actionRequired: T_actionRequired): actionRequired is T_ActionCNodeProps_Required {
    if (actionRequired.type in ActionCNodeProps_collection) {
        return true
    }

    return false
}

export const actionController = new ActionController();
// window.actionController = new ActionController(); // todo