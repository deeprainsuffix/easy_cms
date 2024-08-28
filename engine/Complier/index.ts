import { I_CNode_props, T_ComponentName, type I_CNode_JSON } from "../CNodeTree/CNode/index.type";
import { type T_template_CNode, template_CNode, template_import_essentail, template_exec, template_import_path, RegionHeader, RegionSideMenuBar, template_import_region, template_Combine } from "./template";
import { Root_cNode_meta, Root_cNode_props_key, type I_Root_cNode_props } from "../CNodeTree/CNode/Foundation/Root_CNode.meta";
import { FormBlock_cNode_meta, FormBlock_CNode_props_key, type I_FormBlock_cNode_props } from "../CNodeTree/CNode/Layout/FormBlock_CNode.meta";
import { Input_cNode_meta, Input_CNode_props_key, type I_Input_cNode_props } from "../CNodeTree/CNode/Form/Input_CNode.meta";
import { Select_CNode_props_key, Select_cNode_meta, type I_Select_cNode_props } from "../CNodeTree/CNode/Form/Select_CNode.meta";
import { FileUpload_cNode_meta, FileUpload_CNode_props_key, type I_FileUpload_cNode_props } from "../CNodeTree/CNode/Form/FileUpload_CNode.meta";

interface I_Complier {
    cNodeTree_JSON: I_CNode_JSON | null;

    result_imports: string[];
    result_body: string | null; // 表单区域主体
    result_region: {
        [RegionHeader]: boolean;
        [RegionSideMenuBar]: boolean;
    };
    result: string[];
}

// todo 测一下每个gen函数的时间
export class Complier implements I_Complier {
    cNodeTree_JSON: I_Complier['cNodeTree_JSON'];

    result_imports: I_Complier['result_imports'];
    result_body: I_Complier['result_body'];
    result_region: I_Complier['result_region'];
    result: I_Complier['result'];

    constructor() {
        this.cNodeTree_JSON = null;
        this.result_imports = [];
        this.result_body = null;
        this.result_region = {
            [RegionHeader]: false,
            [RegionSideMenuBar]: false,
        };
        this.result = [];
    }

    // 每次使用前必须调用这一步
    public set_cNodeTree_JSON(cNodeTree_JSON: I_Complier['cNodeTree_JSON']) {
        this.reset();
        this.cNodeTree_JSON = cNodeTree_JSON;
    }

    public gen_form_edit() {
        const { parsed_import, parsed_body } = this.parse();
        for (let m of parsed_import) {
            this.result_imports.push(`import { ${m} } from "${template_import_path}/edit/${m}";\n`);
        }
        this.result_body = 'const FormBody = () => ' + parsed_body.join('');
    }

    public gen_form_preview() {
        const { parsed_import, parsed_body } = this.parse();
        for (let m of parsed_import) {
            this.result_imports.push(`import { ${m} } from "${template_import_path}/preview/${m}";\n`);
        }
        this.result_body = 'const FormBody = () => ' + parsed_body.join('');
    }

    public gen_header() {
        this.result_region[RegionHeader] = true;
    }

    public gen_sideMenuBar() {
        this.result_region[RegionSideMenuBar] = true;
    }

    public getResult(): string {
        // 处理模块
        this.handle_import();
        // 处理body
        this.handle_body();
        // 处理region
        const regionGenerated = this.handle_region();
        // 组合
        this.handle_combine(regionGenerated);
        // 必要工作
        this.result.push(template_exec);
        return this.result.join('');
    }

    public reset() {
        this.cNodeTree_JSON = null;
        this.result_imports = [];
        this.result_body = null;
        this.result_region = {
            [RegionHeader]: false,
            [RegionSideMenuBar]: false,
        };
        this.result = [];
    }

    private handle_import() {
        this.result.push(...template_import_essentail);
        this.result.push(...template_import_region);
        if (this.result_imports) {
            this.result.push(...this.result_imports);
        }
    }

    private handle_body() {
        if (this.result_body) {
            this.result.push(this.result_body);
        }
    }

    private handle_region() {
        const regionGenerated: string[] = [];
        if (this.result_region[RegionHeader]) {
            regionGenerated.push(`is${RegionHeader}={true}`);
        }
        if (this.result_region[RegionSideMenuBar]) {
            regionGenerated.push(`is${RegionSideMenuBar}={true}`);
        }

        return regionGenerated
    }

    private handle_combine(regionGenerated: ReturnType<typeof this.handle_region>) {
        // 在Page组件中写是最简单的
        this.result.push(template_Combine);
        this.result.push(`const Page = () => { return (<Combine ${regionGenerated.join(' ')} />)};\n`);
    }

    private distribute_props(componentName: T_ComponentName, props: I_CNode_props): string {
        let result = '';
        switch (componentName) {
            case Root_cNode_meta['componentName']:
                result = this.gen_props_Root(props as I_Root_cNode_props);
                break;
            case FormBlock_cNode_meta['componentName']:
                result = this.gen_props_formBlock(props as I_FormBlock_cNode_props);
                break;
            case Input_cNode_meta['componentName']:
                result = this.gen_props_Input(props as I_Input_cNode_props);
                break;
            case Select_cNode_meta['componentName']:
                result = this.gen_props_Select(props as I_Select_cNode_props);
                break;
            case FileUpload_cNode_meta['componentName']:
                result = this.gen_props_FileUpload(props as I_FileUpload_cNode_props);
                break;
        }

        return result
    }

    private calculateProps(arr: Array<[string, string]>): string {
        let content = arr.reduce((prev, curr) => {
            return prev + `${curr[0]}: "${curr[1]}", `
        }, '');

        return 'props={{ ' + content + ' }}'
    }

    private gen_props_Root(props: I_Root_cNode_props): string {
        return this.calculateProps([

        ])
    }

    private gen_props_formBlock(props: I_FormBlock_cNode_props): string {
        return this.calculateProps([
            [FormBlock_CNode_props_key.widthRadio, props[FormBlock_CNode_props_key.widthRadio]],
            [FormBlock_CNode_props_key.columnNum, props[FormBlock_CNode_props_key.columnNum]],
            [FormBlock_CNode_props_key.regionName, props[FormBlock_CNode_props_key.regionName]],
        ])
    }

    private gen_props_Input(props: I_Input_cNode_props): string {
        return this.calculateProps([
            [Input_CNode_props_key.fieldKey, props[Input_CNode_props_key.fieldKey]],
            [Input_CNode_props_key.fieldLabel, props[Input_CNode_props_key.fieldLabel]],
            [Input_CNode_props_key.fieldPlaceholder, props[Input_CNode_props_key.fieldPlaceholder]],
        ])
    }

    private gen_props_Select(props: I_Select_cNode_props): string {
        return this.calculateProps([
            [Select_CNode_props_key.fieldKey, props[Select_CNode_props_key.fieldKey]],
            [Select_CNode_props_key.fieldLabel, props[Select_CNode_props_key.fieldLabel]],
            [Select_CNode_props_key.fieldPlaceholder, props[Select_CNode_props_key.fieldPlaceholder]],
        ])
    }

    private gen_props_FileUpload(props: I_FileUpload_cNode_props): string {
        return this.calculateProps([
            [FileUpload_CNode_props_key.fieldKey, props[FileUpload_CNode_props_key.fieldKey]],
            [FileUpload_CNode_props_key.fieldLabel, props[FileUpload_CNode_props_key.fieldLabel]],
            [FileUpload_CNode_props_key.fieldPlaceholder, props[FileUpload_CNode_props_key.fieldPlaceholder]],
        ])
    }

    private gen_cssStyle(cssStyle: I_CNode_JSON['cssStyle']) {
        const result = [];
        for (const [rule, value] of Object.entries(cssStyle)) {
            result.push(rule, ':"', value, '",');
        }

        return ` cssStyle={{${result.join('')}}}`
    }

    private check() {
        if (!this.cNodeTree_JSON) {
            throw '未调用set_cNodeTree_JSON';
        }
    }

    private parse() {
        this.check();

        let
            parsed_import: Set<string> = new Set(),
            parsed_body: string[] = [];

        const parseOne = (json: I_CNode_JSON) => {
            const { componentName } = json;
            const templateItem = template_CNode[componentName];
            parsed_import.add(templateItem.module_import);
            parsed_body.push(
                templateItem['prefix'], ' ',
                this.distribute_props(componentName, json.props),
                this.gen_cssStyle(json.cssStyle),
                templateItem['prefix_close'],
                '\n'
            );
            for (let child of json.children) {
                parseOne(child);
            }
            parsed_body.push(templateItem.suffix, '\n');
        };

        parseOne(this.cNodeTree_JSON!);
        return { parsed_import, parsed_body }
    }
}