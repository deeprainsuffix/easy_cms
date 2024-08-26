import {
    T_ActionTip_Required, T_ActionTip, ActionTip_collection,
    ActionTip_type_select, ActionTip_type_select_none, ActionTip_type_select_update,
    ActionTip_type_dropTarget_update,
    ActionTip_type_dropTarget_none
} from ".";


interface I_ActionTip_Factory {
    createActionTip: (actionRequired: T_ActionTip_Required) => T_ActionTip;
}

export class ActionTip_Factory implements I_ActionTip_Factory {
    constructor() {

    }

    createActionTip(actionRequired: T_ActionTip_Required) {
        let result = {} as T_ActionTip;
        switch (actionRequired.type) {
            case ActionTip_type_select:
                result = new ActionTip_collection[actionRequired.type](actionRequired.id);
                break;
            case ActionTip_type_select_none:
                result = new ActionTip_collection[actionRequired.type]();
                break;
            case ActionTip_type_select_update:
                result = new ActionTip_collection[actionRequired.type]();
                break;
            case ActionTip_type_dropTarget_update:
                result = new ActionTip_collection[actionRequired.type](actionRequired.id);
                break;
            case ActionTip_type_dropTarget_none:
                result = new ActionTip_collection[actionRequired.type]();
                break;
            default:
                throw 'createActionTip失败'
        }

        return result
    };
}

export const actionTip_Factory = new ActionTip_Factory();
// window.actionTip_Factory = new ActionTip_Factory(); // todo