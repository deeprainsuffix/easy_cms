import { FileUpload_cNode_meta } from "../CNodeTree/CNode/Form/FileUpload_CNode.meta";
import { Input_cNode_meta } from "../CNodeTree/CNode/Form/Input_CNode.meta";
import { Select_cNode_meta } from "../CNodeTree/CNode/Form/Select_CNode.meta";
import { Root_cNode_meta } from "../CNodeTree/CNode/Foundation/Root_CNode.meta";
import { FormBlock_cNode_meta } from "../CNodeTree/CNode/Layout/FormBlock_CNode.meta";
import type { T_ComponentName } from "../CNodeTree/CNode/index.type";

type T_template = {
    module_import: string;
    prefix: string;
    prefix_close: '>',
    suffix: string;
}

export type T_template_CNode = {
    [index in T_ComponentName]: T_template;
};

export const template_CNode: T_template_CNode = {
    // 地基类
    [Root_cNode_meta.componentName]: {
        module_import: Root_cNode_meta.componentName,
        prefix: `<${Root_cNode_meta.componentName}`,
        prefix_close: '>',
        suffix: `</${Root_cNode_meta.componentName}>`,
    },

    // 布局类
    [FormBlock_cNode_meta.componentName]: {
        module_import: FormBlock_cNode_meta.componentName,
        prefix: `<${FormBlock_cNode_meta.componentName}`,
        prefix_close: '>',
        suffix: `</${FormBlock_cNode_meta.componentName}>`,
    },

    // 表单类
    [Input_cNode_meta.componentName]: {
        module_import: Input_cNode_meta.componentName,
        prefix: `<${Input_cNode_meta.componentName}`,
        prefix_close: '>',
        suffix: `</${Input_cNode_meta.componentName}>`,
    },
    [Select_cNode_meta.componentName]: {
        module_import: Select_cNode_meta.componentName,
        prefix: `<${Select_cNode_meta.componentName}`,
        prefix_close: '>',
        suffix: `</${Select_cNode_meta.componentName}>`,
    },
    [FileUpload_cNode_meta.componentName]: {
        module_import: FileUpload_cNode_meta.componentName,
        prefix: `<${FileUpload_cNode_meta.componentName}`,
        prefix_close: '>',
        suffix: `</${FileUpload_cNode_meta.componentName}>`,
    },
} as const;

export const template_import_path = '@/components/ui_gen';

export const template_import_essentail = [
    'import React from "react";\n',
    'import { createRoot } from "react-dom/client";\n',
    'import "@/client/Styles/global.css";\n',
] as const;

export const
    RegionHeader = 'RegionHeader',
    RegionSideMenuBar = 'RegionSideMenuBar';

export const template_import_region = [
    `import { ${RegionHeader} } from "${template_import_path}/region/${RegionHeader}";\n`,
    `import { ${RegionSideMenuBar} } from "${template_import_path}/region/${RegionSideMenuBar}";\n`,
] as const;

export const template_Combine = `
interface I_Combine {
    isRegionHeader?: boolean;
    isRegionSideMenuBar?: boolean;
}

function Combine({ isRegionHeader, isRegionSideMenuBar }: I_Combine) {
    return (
        <div className='w-full h-full flex flex-col flex-nowrap'>
            {isRegionHeader && <RegionHeader />}
            <div className='w-full h-0 flex-grow flex-shrink flex flex-nowrap'>
                {isRegionSideMenuBar && <RegionSideMenuBar />}
                <FormBody />
            </div>
        </div>
    )
}`;

export const template_exec = `
const rootDom = document.createElement('div');
rootDom.style.width = '100%';
rootDom.style.height = '100%';
const rootReact = createRoot(rootDom);
rootReact.render(<Page />);
document.body.appendChild(rootDom);
` as const;