import { Root_cNode_meta, Root_CNode } from "./Foundation/Root_CNode";
import { Container_cNode_meta, Container_CNode } from "./Layout/Container_CNode";
import { Input_cNode_meta, Input_CNode } from "./Form/Input_CNode";

export const CNode_collection = {
    // 地基类
    [Root_cNode_meta.componentName]: Root_CNode,

    // 布局类
    [Container_cNode_meta.componentName]: Container_CNode,
    // [E_componentName_layout.container_half]: P,

    // 表单类
    [Input_cNode_meta.componentName]: Input_CNode,
    // [E_componentName_form.select]: P,
};