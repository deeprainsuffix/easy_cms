import { I_CNode_props, T_ComponentName, type I_CNode_JSON } from "../CNodeTree/CNode/type";
import { type T_template_CNode, template_CNode, template_module, template_exec } from "./template";
import { Root_cNode_meta, Root_cNode_props_key, type I_Root_cNode_props } from "../CNodeTree/CNode/Foundation/Root_CNode.meta";
import { FormBlock_cNode_meta, FormBlock_CNode_props_key, type I_FormBlock_cNode_props } from "../CNodeTree/CNode/Layout/FormBlock_CNode.meta";
import { Input_cNode_meta, Input_CNode_props_key, type I_Input_cNode_props } from "../CNodeTree/CNode/Form/Input_CNode.meta";
import { Select_CNode_props_key, Select_cNode_meta, type I_Select_cNode_props } from "../CNodeTree/CNode/Form/Select_CNode.meta";
import { FileUpload_cNode_meta, FileUpload_CNode_props_key, type I_FileUpload_cNode_props } from "../CNodeTree/CNode/Form/FileUpload_CNode.meta";

interface I_CodeGen {
    template_CNode: T_template_CNode;
    template_module: typeof template_module;
    template_exec: typeof template_exec;
    cNodeTree_JSON: I_CNode_JSON | null;
    imports: string[];
    region: {
        header: string | null;
        sideMenuBar: string | null;
        form_edit: string | null;
        form_preview: string | null;
    };
}

// todo 这里要启动service work来帮助工作
// todo 测一下每个gen函数的时间
export class CodeGen implements I_CodeGen {
    template_CNode: I_CodeGen['template_CNode'];
    template_module: I_CodeGen['template_module'];
    template_exec: I_CodeGen['template_exec'];
    cNodeTree_JSON: I_CodeGen['cNodeTree_JSON'];
    imports: I_CodeGen['imports'];
    region: I_CodeGen['region'];

    constructor() {
        this.template_CNode = template_CNode;
        this.template_module = template_module;
        this.template_exec = template_exec;
        this.cNodeTree_JSON = null;
        this.imports = [];
        this.region = {
            header: null,
            sideMenuBar: null,
            form_edit: null,
            form_preview: null,
        };
    }

    // 每次使用前必须调用这一步
    public set_cNodeTree_JSON(cNodeTree_JSON: I_CodeGen['cNodeTree_JSON']) {
        this.cNodeTree_JSON = cNodeTree_JSON;
    }

    public reset() {
        this.cNodeTree_JSON = null;
        this.imports = [];
        this.region.header = null;
        this.region.sideMenuBar = null;
        this.region.form_edit = null;
        this.region.form_preview = null;
    }

    public getResult(): string {
        // todo
        let result: string[] = [];
        result.push(...this.template_module);
        if (this.imports) {
            result.push(...this.imports);
        }

        result.push('const Page = () => ');
        if (this.region.form_edit) {
            result.push(this.region.form_edit);
        }

        result.push(this.template_exec);

        this.reset();

        return result.join('');
    }

    private distribute(componentName: T_ComponentName, props: I_CNode_props): string {
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

    public gen_form_edit() {
        const json = this.cNodeTree_JSON,
            template = this.template_CNode;
        if (!json) {
            throw '未调用set_cNodeTree_JSON';
        }

        let result_import: Set<string> = new Set(), result_body: string[] = [];
        const parse = (json: I_CNode_JSON) => {
            const { componentName } = json;
            const templateItem = template[componentName];

            result_import.add(templateItem.module_import);
            result_body.push(templateItem['prefix'], ' ', this.distribute(componentName, json.props), templateItem['prefix_close'], '\n');
            for (let child of json.children) {
                parse(child);
            }
            result_body.push(templateItem.suffix, '\n');
        };

        parse(json);
        for (let m of result_import) {
            this.imports.push(`import { ${m}_gen as ${m} } from "@/components/ui_gen/${m}";\n`);
        }
        // this.imports = Array.from(result_import).map(m => `import { ${m}_gen as ${m} } from "@/components/ui_gen/${m}";\n`).join('') + '\n';
        this.region.form_edit = result_body.join('');
    }
    public gen_form_preview() {

    }
    public gen_sideMenuBar() {

    }
    public gen_header() {

    }
}

export const codeGen = new CodeGen();