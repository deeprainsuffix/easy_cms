import { Root_CNode, Root_cNode_meta } from "./Foundation/Root_CNode";
import { Container_CNode, Container_cNode_meta } from "./Layout/Container_CNode";
import { Input_CNode, Input_cNode_meta } from "./Form/Input_CNode";
import { Select_CNode, Select_cNode_meta } from "./Form/Select_CNode";
import { FileUpload_CNode, FileUpload_cNode_meta } from "./Form/FileUpload_CNode";

export const CNode_collection = {
    // 地基类
    [Root_cNode_meta.componentName]: Root_CNode,

    // 布局类
    [Container_cNode_meta.componentName]: Container_CNode,

    // 表单类
    [Input_cNode_meta.componentName]: Input_CNode,
    [Select_cNode_meta.componentName]: Select_CNode,
    [FileUpload_cNode_meta.componentName]: FileUpload_CNode,
} as const;