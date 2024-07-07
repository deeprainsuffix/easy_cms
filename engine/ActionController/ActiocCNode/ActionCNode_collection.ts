import {
    ActionCNode_type_add, ActionCNode_add,
    ActionCNode_type_re_add, ActionCNode_re_add,
    ActionCNode_type_copy, ActionCNode_copy,
    ActionCNode_type_move, ActionCNode_move,
    ActionCNode_type_delete, ActionCNode_delete,
    ActionCNode_type_update_props, ActionCNode_update_props,
    ActionCNode_type_update_cssStyle, ActionCNode_update_cssStyle,
} from ".";

export const ActionCNode_collection = {
    [ActionCNode_type_add]: ActionCNode_add,
    [ActionCNode_type_re_add]: ActionCNode_re_add,
    [ActionCNode_type_copy]: ActionCNode_copy,
    [ActionCNode_type_move]: ActionCNode_move,
    [ActionCNode_type_delete]: ActionCNode_delete,
    [ActionCNode_type_update_props]: ActionCNode_update_props,
    [ActionCNode_type_update_cssStyle]: ActionCNode_update_cssStyle,
};

export const ActionCNode_reverse_collection = {

}; // todo