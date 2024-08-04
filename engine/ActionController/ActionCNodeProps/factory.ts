import {
    T_ActionCNodeProps_Required, T_ActionCNodeProps, ActionCNodeProps_collection,
    ActionCNodeProps_type_update,
} from ".";


interface I_ActionCNodeProps_Factory {
    createActionCNodeProps: (actionRequired: T_ActionCNodeProps_Required) => T_ActionCNodeProps;
}

export class ActionCNodeProps_Factory implements I_ActionCNodeProps_Factory {
    constructor() {

    }

    createActionCNodeProps(actionRequired: T_ActionCNodeProps_Required) {
        let result = {} as T_ActionCNodeProps;
        switch (actionRequired.type) {
            case ActionCNodeProps_type_update:
                result = new ActionCNodeProps_collection[actionRequired.type](actionRequired.id, actionRequired.prop, actionRequired.value);
                break;
            default:
                throw 'createActionCNodeProps失败'
        }

        return result
    };
}

export const actionCNodeProps_Factory = new ActionCNodeProps_Factory();
// window.ActionCNodeProps_Factory = new ActionCNodeProps_Factory(); // todo