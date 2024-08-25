import { FileUpload_cNode_meta } from "./Form/FileUpload_CNode.meta";
import { Category_Form_meta } from "./Form/index.meta";
import { Input_cNode_meta } from "./Form/Input_CNode.meta";
import { Select_cNode_meta } from "./Form/Select_CNode.meta";
import { Category_Foundation_meta } from "./Foundation/index.meta";
import { Root_cNode_meta } from "./Foundation/Root_CNode.meta";
import { FormBlock_cNode_meta } from "./Layout/FormBlock_CNode.meta";
import { Category_Layout_meta } from "./Layout/index.meta";


export const CNode_UI_Left_collection = [
    // 地基类
    // {
    //     componentCategory: Category_Foundation_meta.componentCategory,
    //     title: Category_Foundation_meta.title,
    //     components: [
    //         { ...Root_cNode_meta },
    //     ],
    // },
    // 布局类
    {
        componentCategory: Category_Layout_meta.componentCategory,
        title: Category_Layout_meta.title,
        components: [
            { ...FormBlock_cNode_meta },
        ],
    },
    // 表单类
    {
        componentCategory: Category_Form_meta.componentCategory,
        title: Category_Form_meta.title,
        components: [
            { ...Input_cNode_meta },
            { ...Select_cNode_meta },
            { ...FileUpload_cNode_meta },
        ],
    },
] as const;