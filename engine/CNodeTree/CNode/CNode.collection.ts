import { Root_cNode_meta } from "./Foundation/Root_CNode.meta";
import { Root_CNode } from "./Foundation/Root_CNode";
import { FormBlock_cNode_meta } from "./Layout/FormBlock_CNode.meta";
import { FormBlock_CNode } from "./Layout/FormBlock_CNode";
import { Input_cNode_meta } from "./Form/Input_CNode.meta";
import { Input_CNode } from "./Form/Input_CNode";
import { Select_cNode_meta } from "./Form/Select_CNode.meta";
import { Select_CNode } from "./Form/Select_CNode";
import { FileUpload_cNode_meta } from "./Form/FileUpload_CNode.meta";
import { FileUpload_CNode } from "./Form/FileUpload_CNode";

export const CNode_collection = {
    // 地基类
    [Root_cNode_meta.componentName]: Root_CNode,

    // 布局类
    [FormBlock_cNode_meta.componentName]: FormBlock_CNode,

    // 表单类
    [Input_cNode_meta.componentName]: Input_CNode,
    [Select_cNode_meta.componentName]: Select_CNode,
    [FileUpload_cNode_meta.componentName]: FileUpload_CNode,
} as const;