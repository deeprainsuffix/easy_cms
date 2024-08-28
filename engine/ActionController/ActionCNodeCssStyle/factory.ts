import {
    T_ActionCNodeCssStyle_Required, T_ActionCNodeCssStyle, ActionCNodeCssStyle_collection,
    ActionCNodeCssStyle_type_update,
} from ".";


interface I_ActionCNodeCssStyle_Factory {
    createActionCNodeCssStyle: (actionRequired: T_ActionCNodeCssStyle_Required) => T_ActionCNodeCssStyle;
}

export class ActionCNodeCssStyle_Factory implements I_ActionCNodeCssStyle_Factory {
    constructor() {

    }

    createActionCNodeCssStyle(actionRequired: T_ActionCNodeCssStyle_Required) {
        let result = {} as T_ActionCNodeCssStyle;
        switch (actionRequired.type) {
            case ActionCNodeCssStyle_type_update:
                result = new ActionCNodeCssStyle_collection[actionRequired.type](actionRequired.id, actionRequired.cssStyle);
                break;
            default:
                throw 'createActionCNodeCssStyle失败'
        }

        return result
    };
}

export const actionCNodeCssStyle_Factory = new ActionCNodeCssStyle_Factory();
// window.ActionCNodeCssStyle_Factory = new ActionCNodeCssStyle_Factory(); // todo