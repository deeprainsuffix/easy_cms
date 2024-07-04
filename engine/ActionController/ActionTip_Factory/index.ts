import type { T_ActionTip_Props, T_ActionTip } from "../ActiocTip/type";
import { ActionTip_collection } from '../ActiocTip/ActionTip_collection';
import { ActionTip_type_select } from "../ActiocTip";


interface I_ActionTip_Factoty {
    createActionTip: (actionProps: T_ActionTip_Props) => T_ActionTip;
}

export class ActionTip_Factoty implements I_ActionTip_Factoty {
    constructor() {

    }

    createActionTip(actionProps: T_ActionTip_Props) {
        let result = {} as T_ActionTip;
        switch (actionProps.type) {
            case ActionTip_type_select:
                result = new ActionTip_collection[actionProps.type](actionProps.id);
                break;
            default:
                throw '没有这样的ActionTip_type'
        }

        return result
    };
}

export const actionTip_Factoty = new ActionTip_Factoty();