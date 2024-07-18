import { Root_cNode_meta, Root_cNode } from "./Foundation/Root_cNode";
import { Container_cNode_meta, Container_cNode } from "./Layout/container_cNode";
import { Input_cNode_meta, Input_cNode } from "./Form/Input_cNode";

export const cNode_collection = {
    // 地基类
    [Root_cNode_meta.componentName]: Root_cNode,

    // 布局类
    [Container_cNode_meta.componentName]: Container_cNode,
    // [E_componentName_layout.container_half]: P,

    // 表单类
    [Input_cNode_meta.componentName]: Input_cNode,
    // [E_componentName_form.select]: P,
};