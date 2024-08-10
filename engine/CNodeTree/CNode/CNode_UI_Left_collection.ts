import { Category_Foundation_meta } from "./Foundation";
import { Root_cNode_meta } from "./Foundation/Root_CNode";

import { Category_Layout_meta } from "./Layout";
import { Container_cNode_meta } from "./Layout/Container_CNode";

import { Category_Form_meta } from "./Form";
import { Input_cNode_meta } from "./Form/Input_CNode";
import { Select_cNode_meta } from "./Form/Select_CNode";

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
            { ...Container_cNode_meta },
        ],
    },
    // 表单类
    {
        componentCategory: Category_Form_meta.componentCategory,
        title: Category_Form_meta.title,
        components: [
            { ...Input_cNode_meta },
            { ...Select_cNode_meta },
        ],
    },
] as const;