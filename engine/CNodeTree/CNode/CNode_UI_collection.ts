import { Root_cNode_meta } from "./Foundation/Root_CNode";
import { Root_CNode_UI } from "./Foundation/Root_CNode_UI";
import { Container_cNode_meta } from "./Layout/Container_CNode";
import { Container_CNode_UI } from "./Layout/Container_CNode_UI";
import { Input_cNode_meta } from "./Form/Input_CNode";
import { Input_CNode_UI } from "./Form/Input_CNode_UI";
import { Select_cNode_meta } from "./Form/Select_CNode";
import { Select_CNode_UI } from "./Form/Select_CNode_UI";
import { FileUpload_cNode_meta } from "./Form/FileUpload_CNode";
import { FileUpload_CNode_UI } from "./Form/FileUpload_CNode_UI";

const CNode_collection = {
    // 地基类
    // [Root_cNode_meta.componentName]: Root_CNode_UI,

    // 布局类
    [Container_cNode_meta.componentName]: Container_CNode_UI,

    // 表单类
    [Input_cNode_meta.componentName]: Input_CNode_UI,
    [Select_cNode_meta.componentName]: Select_CNode_UI,
    [FileUpload_cNode_meta.componentName]: FileUpload_CNode_UI,
} as const;