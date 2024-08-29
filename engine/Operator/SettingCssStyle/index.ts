import type { T_CNode } from "@/engine/CNodeTree/CNode/index.type";
import { DependOnSelectedCNode, I_Detail_SelectedCNodeChange } from "../dependOnSelectedCNode";
import * as monaco from 'monaco-editor'; // 优化打包
import { actionController } from "@/engine/ActionController";
import { ActionCNodeCssStyle_type_update } from "@/engine/ActionController/ActionCNodeCssStyle";
import { toast_dom } from "@/lib/utils";

class SettingCssStyle extends DependOnSelectedCNode {
    render: any;
    select_id: string | null;
    cssStyle_ori: T_CNode['cssStyle'] | null;
    cssEditor: ReturnType<typeof monaco.editor.create> | null;
    contentFirstChange: boolean;

    constructor() {
        super();
        this.select_id = null;
        this.cssStyle_ori = null;
        this.cssEditor = null;
        this.contentFirstChange = false;
    }

    public notify(e: CustomEvent<I_Detail_SelectedCNodeChange>) {
        const { selectedCNode } = e.detail;
        this.update_selectedCNode(selectedCNode);

        if (selectedCNode) {
            this.update(selectedCNode);
        } else {
            this.reset();
        }
    }

    public cssEditor_create(dom: HTMLElement) {
        if (!this.selectedCNode) {
            return
        }

        this.cssEditor_dispose();
        const cssRulesStr = this.cssStyle2str(this.selectedCNode.cssStyle);
        this.cssEditor = monaco.editor.create(dom, {
            value: cssRulesStr,
            language: "css",
            automaticLayout: true,
        });

        this.cssEditor.onDidChangeModelContent(e => {
            if (!this.cssEditor) {
                return
            }

            if (this.contentFirstChange) {
                return
            }

            this.contentFirstChange = true;
            this.render();
        });
    }

    public cssEditor_dispose() {
        if (this.cssEditor) {
            this.cssEditor.dispose();
            this.cssEditor = null;
        }
    }

    private update(selectedCNode: T_CNode) {
        this.reset();
        this.select_id = '#' + selectedCNode.id;
        this.cssStyle_ori = { ...selectedCNode.cssStyle_default };
        this.cssEditor = null;
    }

    private reset() {
        this.select_id = null;
        this.cssStyle_ori = null;
        this.cssEditor_dispose();
        this.contentFirstChange = false;
    }

    public css_reset() {
        if (!(this.cssEditor && this.cssStyle_ori)) {
            return
        }

        this.cssEditor.setValue(this.cssStyle2str(this.cssStyle_ori));
        actionController.dispatchAction({
            type: ActionCNodeCssStyle_type_update,
            id: this.selectedCNode!.id,
            cssStyle: { ...this.cssStyle_ori },
        });
        this.contentFirstChange = false;
        this.render();
    }

    public css_save() {
        if (!(this.cssEditor && this.selectedCNode)) {
            return
        }

        if (monaco.editor.getModelMarkers({}).length) {
            toast_dom('css有语法错误');
            this.contentFirstChange = false;
            this.render();
            return
        }

        const cssStyle_format = this.cssEditor.getValue().replace(/[\r\n\s]*/g, '');
        const cssStyle = this.resolveCssStyle_firstLevel(cssStyle_format, this.select_id!);
        this.cssEditor.setValue(this.cssStyle2str(cssStyle));
        actionController.dispatchAction({
            type: ActionCNodeCssStyle_type_update,
            id: this.selectedCNode!.id,
            cssStyle,
        });
        this.contentFirstChange = false;
        this.render();
    }

    private cssStyle2str(cssStyle: T_CNode['cssStyle']) {
        const re = /[A-Z]/;
        const result = [];
        for (const [rule, value] of Object.entries(cssStyle)) {
            result.push(rule.replace(re, d => '-' + d[0].toLowerCase()), ':', value, ';\n');
        }

        return `${this.select_id}{\n${(result.join(''))}}`
    }

    // 只寻找selector_id_target的第一层级的css规则
    // 其实需要编辑器给信息提示
    private resolveCssStyle_firstLevel(input: string, target_id: string) {
        const rulesArr: string[][] = [],
            cssStyle: any = {}; // 保证是T_CNode_Concrete['cssStyle']

        const re = /-[a-z]/;
        function resove_rule(l: number, r: number) {
            if (l >= r) {
                return
            }

            input.substring(l, r + 1).split(';').forEach(str => {
                const arr2 = str.split(':');
                if (arr2.length === 2) {
                    arr2[0] = arr2[0].replace(re, d => d[1].toUpperCase());
                    rulesArr.push(arr2);
                }
            });
        }

        const
            brackets_left = '{',
            brackets_Right = '}',
            n = input.length;

        let
            stack = [],
            i = 0, j = 0,
            selector_id = '', l = 0, validate = false;
        while (j < n) {
            i = j;
            l = 0; validate = false;

            while (j < n && input[j] !== brackets_left) {
                j++;
            }
            stack.push(brackets_left);
            selector_id = input.substring(i, j);
            j++;
            if (selector_id === target_id) {
                validate = true;
                l = j;
            }
            while (stack.length) {
                switch (input[j]) {
                    case brackets_left:
                        if (validate && stack.length === 1) {
                            resove_rule(l, j - 1);
                        }
                        stack.push(brackets_left);
                        j++;
                        break;
                    case brackets_Right:
                        stack.pop();
                        j++;
                        if (validate && stack.length === 1) {
                            l = j;
                        }
                        break;
                    default:
                        j++;
                }
            }
            if (validate) {
                resove_rule(l, j - 2);
            }
        }

        for (let [rule, value] of rulesArr) {
            cssStyle[rule] = value;
        }

        return cssStyle as T_CNode['cssStyle']
    }
}

export const settingCssStyle = new SettingCssStyle();