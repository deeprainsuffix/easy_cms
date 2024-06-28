import { E_componentName_root, E_componentName_layout, E_componentName_form } from "./type";
import { Root_cNode } from "./Root/Root_cNode";
import { Container_cNode } from "./Layout/container_cNode";
import { Input_cNode } from "./Form/Input_cNode";

const collection = {
    // 根类
    [E_componentName_root.root]: Root_cNode,

    // 布局类
    [E_componentName_layout.container]: Container_cNode,
    // [E_componentName_layout.container_half]: P,

    // 表单类
    [E_componentName_form.input]: Input_cNode,
    // [E_componentName_form.select]: P,
};

export default collection