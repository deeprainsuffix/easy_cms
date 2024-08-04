
import {
    T_ActionCNode_Required, T_ActionCNode, ActionCNode_collection,
    ActionCNode_type_add, ActionCNode_type_re_add, ActionCNode_type_copy, ActionCNode_type_delete, ActionCNode_type_move,
} from ".";

interface I_ActionCNode_Factory {
    // createActionCNode: (actionRequired: T_ActionCNode_Required) => T_ActionCNode;
    // createActionCNode_reverse: (actionCNode: T_ActionCNode) => T_ActionCNode;
    // undoStack: T_ActionCNode[]; redoStack: T_ActionCNode[];
    // do、undo、redo都是同时处理单命令
    do: (actionRequired: T_ActionCNode_Required) => T_ActionCNode; undo: () => T_ActionCNode | null; redo: () => T_ActionCNode | null;
}

class ActionCNode_Factory implements I_ActionCNode_Factory {
    private undoStack: T_ActionCNode[]; private redoStack: T_ActionCNode[];
    constructor() {
        this.undoStack = []; this.redoStack = [];
    }

    private createActionCNode(actionRequired: T_ActionCNode_Required) {
        let result;
        switch (actionRequired.type) {
            case ActionCNode_type_add:
                result = new ActionCNode_collection[actionRequired.type](actionRequired.parentId, actionRequired.componentName, actionRequired.pos);
                break;
            case ActionCNode_type_copy:
                result = new ActionCNode_collection[actionRequired.type](actionRequired.copyId, actionRequired.parentId, actionRequired.pos);
                break;
            case ActionCNode_type_move:
                result = new ActionCNode_collection[actionRequired.type](actionRequired.id, actionRequired.moveFromParentId, actionRequired.moveFromPos, actionRequired.moveToParentId, actionRequired.moveToPos);
                break;
            case ActionCNode_type_delete:
                result = new ActionCNode_collection[actionRequired.type](actionRequired.id, actionRequired.prevParentId, actionRequired.pos);
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
            default:
                throw 'createActionCNode_reverse失败';
        }

        return result
    }

    public do(actionRequired: T_ActionCNode_Required) {
        const actionCNode = this.createActionCNode(actionRequired);
        this.undoStack.push(actionCNode);
        this.redoStack.length = 0;
        return actionCNode
    }

    public getUndoStackSize() {
        return this.undoStack.length
    }

    public getRedoStackSize() {
        return this.redoStack.length
    }

    public undo() {
        if (this.undoStack.length === 0) {
            return null
        }

        const actionCNode = this.undoStack.pop() as T_ActionCNode;
        const action_reserve = this.createActionCNode_reverse(actionCNode);
        this.redoStack.push(action_reserve);
        return action_reserve
    }

    public redo() {
        if (this.redoStack.length === 0) {
            return null
        }

        const actionCNode = this.redoStack.pop() as T_ActionCNode;
        const action_reserve = this.createActionCNode_reverse(actionCNode);
        this.undoStack.push(action_reserve);
        return action_reserve
    }
}

export const actionCNode_Factory = new ActionCNode_Factory();
// window.actionCNode_Factory = new ActionCNode_Factory(); // todo