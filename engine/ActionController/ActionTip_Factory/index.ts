import type { T_ActionTip_Props, T_ActionTip } from "../ActiocTip/type";
import { ActionTip_collection } from '../ActiocTip/ActionTip_collection';
import { ActionTip_type_select } from "../ActiocTip";


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
            default:
                throw 'createActionTip失败'
        }

        return result
    };
}

export const actionTip_Factory = new ActionTip_Factory();
// window.actionTip_Factory = new ActionTip_Factory(); // todo