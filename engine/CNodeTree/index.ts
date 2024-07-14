import { CNode } from './CNode/index'
import { testRender } from '../../client'
import cNode_collection from './CNode/cNode_collection';
import type { T_ComponentName } from './CNode/type';
import { T_ActionCNode } from '../ActionController/ActiocCNode/type';
import { T_ActionTip } from '../ActionController/ActiocTip/type';
import { ActionCNode_type_add, ActionCNode_type_copy, ActionCNode_type_delete, ActionCNode_type_move, ActionCNode_type_re_add, ActionCNode_type_update_cssStyle, ActionCNode_type_update_props } from '../ActionController/ActiocCNode';

class CNodeTreeBase {
    constructor() {

    }

    /**
     * 将cNode添加到parent，根据cNode的的pos
     * @param cNode CNode
     * @param parent CNode
     * @returns parent
     */
    protected alter_appendAsChild(cNode: CNode, parent: CNode, pos: number = cNode.pos) {
        cNode.parent = parent;
        if (pos < 0) {
            parent.children.push(cNode);
            cNode.pos = parent.children.length - 1;
        } else {
            if (parent.children[pos]) {
                parent.children.splice(pos, 0, cNode);
                for (let fixPos = pos + 1; fixPos < parent.children.length; fixPos++) {
                    parent.children[fixPos] && (parent.children[fixPos]!.pos = fixPos);
                }
            } else {
                parent.children[pos] = cNode;
            }
            cNode.pos = pos;
        }

        return parent
    }

    /**
     * 将cNode添加成为refCNode的下一个兄弟节点，返回parent
     * @param cNode CNode
     * @param refCNode CNode
     * @returns parent
     */
    protected alter_appendAsNext(cNode: CNode, refCNode: CNode) {
        const parent = refCNode.parent as CNode;
        return this.alter_appendAsChild(cNode, parent, refCNode.pos + 1);
    }

    // 将cNode添加成为refCNode的上一个兄弟节点，返回parent
    protected alter_appendAsPrev(cNode: CNode, refCNode: CNode) {
        const parent = refCNode.parent as CNode;
        return this.alter_appendAsChild(cNode, parent, refCNode.pos);
    }

    /**
     * 删除cNode，返回parent， todo 是否可以改为: 不需要删除CNode与其子节点的联系，
     * @param cNode CNode
     */
    protected alter_delete(cNode: CNode) {
        const parent = cNode.parent as CNode;
        parent.children[cNode.pos] = null;
        cNode.parent = null;
        cNode.pos = -1;

        return parent
    }
}

let testId = Number.MAX_SAFE_INTEGER; // todelete

/**
 * 1 接受Action
 * 2.1 生产CNode
 * 2.2 完成CNode的编排
 * 2.3 渲染视图(这一步)
 */
class CNodeTree extends CNodeTreeBase {
    // static cNode_collection = cNode_collection; // todo
    static cNodeMap = new Map<string, CNode>();

    root: CNode | null;
    renderNodes: CNode[];
    constructor() {
        super();
        this.root = null;
        this.renderNodes = [];
        this.bootstrap();
    }

    // 暴露，接收Action，根据各种action进行节点生产或调度，之后刷新视图
    public receiveActionCNode(action: T_ActionCNode) {
        switch (action.type) {
            case ActionCNode_type_add: {
                const { componentName, id, parentId, pos } = action;
                const cNode = this.produce(componentName, id);
                const parent = CNodeTree.cNodeMap.get(parentId)!;
                this.renderNodes.push(this.alter_appendAsChild(cNode, parent, pos));

            }
                break;
            case ActionCNode_type_re_add:
                break;
            case ActionCNode_type_copy:
                break;
            case ActionCNode_type_move: {
                const { id, moveFromParentId, moveFromPos, moveToParentId, moveToPos } = action;
                const cNode = CNodeTree.cNodeMap.get(id)!,
                    // parentFrom = CNodeTree.cNodeMap.get(moveFromParentId)!,
                    parentTo = CNodeTree.cNodeMap.get(moveToParentId)!;
                this.renderNodes.push(this.alter_delete(cNode));
                this.renderNodes.push(this.alter_appendAsChild(cNode, parentTo, moveToPos));
            }

                break;
            case ActionCNode_type_delete:
                break;
            case ActionCNode_type_update_props:
                break;
            case ActionCNode_type_update_cssStyle:
                break;
            default:
                throw 'receiveActionCNode失败';
        }

        this.render();
    }

    public receiveActionTip(action: T_ActionTip) {

    }

    // 生产一个具体的cNode节点 todo
    private produce(
        componentName: T_ComponentName,
        id: string,
    ) {
        const CNodeClassFunc = cNode_collection[componentName];
        const cNode = new CNodeClassFunc(
            id, null, -1, [],
        );
        CNodeTree.cNodeMap.set(id, cNode);

        return cNode
    }

    private render() {
        this.renderNodes.forEach(renderNode => {
            renderNode.render();
        });
        this.renderNodes.length = 0;
    }

    createRoot_fortest() { // todelete
        this.root = this.produce('root', String(testId--));
        const container = this.produce('container', String(testId--));
        this.alter_appendAsChild(container, this.root);
        const container2 = this.produce('container', String(testId--));
        this.alter_appendAsChild(container2, this.root);
    }
    public bootstrap() {
        this.createRoot_fortest();
        testRender(this.root as CNode);
    }
}

// todo
export const cNodeTree = new CNodeTree();
cNodeTree.bootstrap();

(window as any).CNodeTree = CNodeTree; // todelete
