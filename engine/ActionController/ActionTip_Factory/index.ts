import {
    T_ActionTip_Props, T_ActionTip, ActionTip_collection,
    ActionTip_type_select, ActionTip_type_select_none,
} from "../ActiocTip";


interface I_ActionTip_Factory {
    createActionTip: (actionProps: T_ActionTip_Props) => T_ActionTip;
}

export class ActionTip_Factory implements I_ActionTip_Factory {
    constructor() {

    }

    createActionTip(actionProps: T_ActionTip_Props) {
        let result = {} as T_ActionTip;
        switch (actionProps.type) {
            case ActionTip_type_select:
                result = new ActionTip_collection[actionProps.type](actionProps.id);
                break;
            case ActionTip_type_select_none:
                result = new ActionTip_collection[actionProps.type]();
                break;
            default:
                throw 'createActionTip失败'
        }

        return result
    };
}

export const actionTip_Factory = new ActionTip_Factory();
// window.actionTip_Factory = new ActionTip_Factory(); // todo