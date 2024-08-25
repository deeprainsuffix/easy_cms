import { Root_cNode_meta } from "./Foundation/Root_CNode.meta";
import { Root_CNode_UI } from "./Foundation/Root_CNode.UI";
import { FormBlock_cNode_meta } from "./Layout/FormBlock_CNode.meta";
import { FormBlock_CNode_UI } from "./Layout/FormBlock_CNode.UI";
import { Input_cNode_meta } from "./Form/Input_CNode.meta";
import { Input_CNode_UI } from "./Form/Input_CNode.UI";
import { Select_cNode_meta } from "./Form/Select_CNode.meta";
import { Select_CNode_UI } from "./Form/Select_CNode.UI";
import { FileUpload_cNode_meta } from "./Form/FileUpload_CNode.meta";
import { FileUpload_CNode_UI } from "./Form/FileUpload_CNode.UI";

export const CNode_UI_collection = {
    // 地基类
    [Root_cNode_meta.componentName]: Root_CNode_UI,

    // 布局类
    [FormBlock_cNode_meta.componentName]: FormBlock_CNode_UI,

    // 表单类
    [Input_cNode_meta.componentName]: Input_CNode_UI,
    [Select_cNode_meta.componentName]: Select_CNode_UI,
    [FileUpload_cNode_meta.componentName]: FileUpload_CNode_UI,
} as const;