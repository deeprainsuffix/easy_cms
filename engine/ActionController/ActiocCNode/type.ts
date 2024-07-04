import type { ActionCNode_add, ActionCNode_copy, ActionCNode_delete, ActionCNode_move, ActionCNode_update_cssStyle, ActionCNode_update_props } from "."
import type { I_ActionCNode_add, I_ActionCNode_copy, I_ActionCNode_delete, I_ActionCNode_move, I_ActionCNode_update_cssStyle, I_ActionCNode_update_props } from ".";

type I_ActionCNode_add_props = {
    [prop in keyof I_ActionCNode_add as Exclude<prop, 'id'>]: I_ActionCNode_add[prop];
}
type I_ActionCNode_copy_props = {
    [prop in keyof I_ActionCNode_copy as Exclude<prop, 'id'>]: I_ActionCNode_copy[prop];
}

export type T_ActionCNode_Props =
    I_ActionCNode_add_props |
    I_ActionCNode_copy_props |
    I_ActionCNode_move |
    I_ActionCNode_delete |
    I_ActionCNode_update_props |
    I_ActionCNode_update_cssStyle
    ;

export type T_ActionCNode =
    ActionCNode_add |
    ActionCNode_copy |
    ActionCNode_move |
    ActionCNode_delete |
    ActionCNode_update_props |
    ActionCNode_update_cssStyle
    ;
