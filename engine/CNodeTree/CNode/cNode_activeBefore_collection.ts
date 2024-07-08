import { Root_cNode_meta } from "./Foundation/Root_cNode";
import { Root_activeBefore } from "./Foundation/Root_activeBefore";
import { Container_cNode_meta } from "./Layout/container_cNode";
import { Container_activeBefore } from "./Layout/Container_activeBefore";
import { Input_cNode_meta } from "./Form/Input_cNode";
import { Input_activeBefore } from "./Form/Input_activeBefore";

const cNode_activeBefore_collection = {
    // 地基类
    [Root_cNode_meta.componentName]: {
        ...Root_cNode_meta,
        ReactComponentFuncBefore: Root_activeBefore,
    },

    // 布局类
    [Container_cNode_meta.componentName]: {
        ...Container_cNode_meta,
        ReactComponentFuncBefore: Container_activeBefore,
    },
    // [E_componentName_layout.container_half]: P,

    // 表单类
    [Input_cNode_meta.componentName]: {
        ...Input_cNode_meta,
        ReactComponentFuncBefore: Input_activeBefore,
    },
    // [E_componentName_form.select]: P,
};

export default cNode_activeBefore_collection