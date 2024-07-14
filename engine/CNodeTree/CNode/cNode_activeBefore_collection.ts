import { Category_Foundation_meta } from "./Foundation";
import { Root_cNode_meta } from "./Foundation/Root_cNode";
import { Root_activeBefore } from "./Foundation/Root_activeBefore";

import { Category_Layout_meta } from "./Layout";
import { Container_cNode_meta } from "./Layout/container_cNode";
import { Container_activeBefore } from "./Layout/Container_activeBefore";

import { Category_Form_meta } from "./Form";
import { Input_cNode_meta } from "./Form/Input_cNode";
import { Input_activeBefore } from "./Form/Input_activeBefore";

const cNode_activeBefore_collection = {
    // 地基类
    [Category_Foundation_meta.componentCategory]: [
        {
            ...Root_cNode_meta,
            ReactComponentFuncActiveBefore: Root_activeBefore,
        },
    ],

    // 布局类
    [Category_Layout_meta.componentCategory]: [
        {
            ...Container_cNode_meta,
            ReactComponentFuncActiveBefore: Container_activeBefore,
        },
    ],

    // 表单类
    [Category_Form_meta.componentCategory]: [
        {
            ...Input_cNode_meta,
            ReactComponentFuncActiveBefore: Input_activeBefore,
        },
    ],
};

export default cNode_activeBefore_collection