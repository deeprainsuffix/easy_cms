
import {
    T_ActionCNode_Props, T_ActionCNode, ActionCNode_collection,
    ActionCNode_type_add, ActionCNode_type_re_add, ActionCNode_type_copy, ActionCNode_type_delete, ActionCNode_type_move, ActionCNode_type_update_cssStyle, ActionCNode_type_update_props,
} from "../ActiocCNode";

interface I_ActionCNode_Factory {
    // createActionCNode: (actionProps: T_ActionCNode_Props) => T_ActionCNode;
    // createActionCNode_reverse: (actionCNode: T_ActionCNode) => T_ActionCNode;
    // undoStack: T_ActionCNode[]; redoStack: T_ActionCNode[];
    // do、undo、redo都是同时处理单命令
    do: (actionProps: T_ActionCNode_Props) => T_ActionCNode; undo: () => T_ActionCNode | undefined; redo: () => T_ActionCNode | undefined;
}

class ActionCNode_Factory implements I_ActionCNode_Factory {
    private undoStack: T_ActionCNode[]; redoStack: T_ActionCNode[];
    constructor() {
        this.undoStack = []; this.redoStack = [];
    }

    private createActionCNode(actionProps: T_ActionCNode_Props) {
        let result;
        switch (actionProps.type) {
            case ActionCNode_type_add:
                result = new ActionCNode_collection[actionProps.type](actionProps.parentId, actionProps.componentName, actionProps.pos);
                break;
            case ActionCNode_type_copy:
                result = new ActionCNode_collection[actionProps.type](actionProps.copyId, actionProps.parentId, actionProps.pos);
                break;
            case ActionCNode_type_move:
                result = new ActionCNode_collection[actionProps.type](actionProps.id, actionProps.moveFromParentId, actionProps.moveFromPos, actionProps.moveToParentId, actionProps.moveToPos);
                break;
            case ActionCNode_type_delete:
                result = new ActionCNode_collection[actionProps.type](actionProps.id, actionProps.prevParentId, actionProps.pos);
                break;
            case ActionCNode_type_update_props:
                result = new ActionCNode_collection[actionProps.type](actionProps.id, actionProps.updateKey);
                break;
            case ActionCNode_type_update_cssStyle:
                result = new ActionCNode_collection[actionProps.type](actionProps.id, actionProps.updateKey);
                break;
            default:
                throw 'createActionCNode失败';
        }

        return result
    };

    private createActionCNode_reverse(actionCNode: T_ActionCNode) {
        // 这里也是使用switch区分吧，有类型推断，不用再建一个collection map表
        let result;
        switch (actionCNode.type) {
            case ActionCNode_type_add:
                result = new ActionCNode_collection[ActionCNode_type_delete](actionCNode.id, actionCNode.parentId, actionCNode.pos);
                break;
            case ActionCNode_type_re_add:
                result = new ActionCNode_collection[ActionCNode_type_delete](actionCNode.id, actionCNode.parentId, actionCNode.pos);
                break;
            case ActionCNode_type_copy:
                result = new ActionCNode_collection[ActionCNode_type_delete](actionCNode.id, actionCNode.parentId, actionCNode.pos);
                break;
            case ActionCNode_type_move:
                result = new ActionCNode_collection[ActionCNode_type_move](actionCNode.id, actionCNode.moveToParentId, actionCNode.moveToPos, actionCNode.moveFromParentId, actionCNode.moveFromPos);
                break;
            case ActionCNode_type_delete:
                result = new ActionCNode_collection[ActionCNode_type_re_add](actionCNode.id, actionCNode.prevParentId, actionCNode.pos);
                break;
            // todo
            // case ActionCNode_type_update_props:
            //     result = new ActionCNode_collection[actionCNode.type](actionCNode.id, actionCNode.updateKey);
            //     break;
            // case ActionCNode_type_update_cssStyle:
            //     result = new ActionCNode_collection[actionCNode.type](actionCNode.id, actionCNode.updateKey);
            //     break;
            default:
                throw 'createActionCNode_reverse失败';
        }

        return result
    }

    public do(actionProps: T_ActionCNode_Props) {
        const actionCNode = this.createActionCNode(actionProps);
        this.undoStack.push(actionCNode);
        this.redoStack.length = 0;
        return actionCNode
    }

    public undo() {
        if (this.undoStack.length === 0) {
            return
        }

        const actionCNode = this.undoStack.pop() as T_ActionCNode;
        const action_reserve = this.createActionCNode_reverse(actionCNode);
        this.redoStack.push(action_reserve);
        return action_reserve
    }

    public redo() {
        if (this.redoStack.length === 0) {
            return
        }

        const actionCNode = this.redoStack.pop() as T_ActionCNode;
        const action_reserve = this.createActionCNode_reverse(actionCNode);
        this.undoStack.push(action_reserve);
        return action_reserve
    }
}

export const actionCNode_Factory = new ActionCNode_Factory();
// window.actionCNode_Factory = new ActionCNode_Factory(); // todo