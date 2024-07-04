import type { T_ActionCNode_Props, T_ActionCNode } from "../ActiocCNode/type";
import { ActionCNode_collection } from '../ActiocCNode/ActionCNode_collection';
import { ActionCNode_type_Add, ActionCNode_type_copy, ActionCNode_type_delete, ActionCNode_type_move, ActionCNode_type_update_cssStyle, ActionCNode_type_update_props } from "../ActiocCNode";

interface I_ActionCNode_Factoty {
    undoStack: T_ActionCNode[]; redoStack: T_ActionCNode[];
    createActionCNode: (actionProps: T_ActionCNode_Props) => T_ActionCNode;
    // createActionCNode_reverse: (action: T_ActionCNode) => T_ActionCNode; // todo
}

class ActionCNode_Factoty implements I_ActionCNode_Factoty {
    undoStack: T_ActionCNode[]; redoStack: T_ActionCNode[];
    constructor() {
        this.undoStack = []; this.redoStack = [];
    }

    createActionCNode(actionProps: T_ActionCNode_Props) {
        let result;
        switch (actionProps.type) {
            case ActionCNode_type_Add:
                result = new ActionCNode_collection[actionProps.type](actionProps.parentId, actionProps.componentName);
                break;
            case ActionCNode_type_copy:
                result = new ActionCNode_collection[actionProps.type](actionProps.copyId);
                break;
            case ActionCNode_type_move:
                result = new ActionCNode_collection[actionProps.type](actionProps.id, actionProps.moveToParentId);
                break;
            case ActionCNode_type_delete:
                result = new ActionCNode_collection[actionProps.type](actionProps.id);
                break;
            case ActionCNode_type_update_props:
                result = new ActionCNode_collection[actionProps.type](actionProps.id, actionProps.updateKey);
                break;
            case ActionCNode_type_update_cssStyle:
                result = new ActionCNode_collection[actionProps.type](actionProps.id, actionProps.updateKey);
                break;
            default:
                throw '没有这样的ActionCNode_type';
        }

        return result
    };
}

export const actionCNode_Factoty = new ActionCNode_Factoty();