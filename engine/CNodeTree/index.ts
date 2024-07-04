import { CNode } from './CNode/index'
import { testRender } from '../../client'
import cNode_collection from './CNode/cNode_collection';
import type { T_ComponentName, T_componentCategory } from './CNode/type';

class CNodeTreeBase {
    constructor() {

    }

    /**
     * 将CNode添加到parent成为其最后一个子节点，返回parent
     * @param cNode CNode
     * @param parent CNode
     * @returns parent
     */
    protected alter_appendAsChild_last(cNode: CNode, parent: CNode) {
        const prev = parent.children[parent.children.length - 1];
        if (prev) {
            prev.next = cNode;
        }
        parent.children.push(cNode);
        cNode.parent = parent;

        return parent
    }

    // 将CNode添加到parent成为其第一个子节点，返回parent
    protected alter_appendAsChild_first(cNode: CNode, parent: CNode) {
        const next = parent.children[0];
        if (next) {
            cNode.next = next;
        }
        parent.children.unshift(cNode);
        cNode.parent = parent;

        return parent
    }

    /**
     * 将CNode添加成为refCNode的下一个兄弟节点，返回parent
     * @param cNode CNode
     * @param refCNode CNode
     * @returns parent
     */
    protected alter_appendAsNext(cNode: CNode, refCNode: CNode) {
        const parent = refCNode.parent as CNode;
        if (!refCNode.next) {
            return this.alter_appendAsChild_last(cNode, parent);
        }

        const index = parent.children.indexOf(refCNode);
        parent.children.splice(index + 1, 0, cNode);
        cNode.parent = parent;
        cNode.next = refCNode.next;
        refCNode.next = cNode;

        return parent
    }

    // 将CNode添加成为refCNode的上一个兄弟节点，返回parent
    protected alter_appendAsPrev(cNode: CNode, refCNode: CNode) {
        const parent = refCNode.parent as CNode;
        const index = parent.children.indexOf(refCNode);
        if (index === 0) {
            return this.alter_appendAsChild_first(cNode, parent);
        }

        parent.children.splice(index, 0, cNode);
        cNode.parent = parent;
        cNode.next = refCNode;
        parent.children[index - 1].next = cNode;

        return parent
    }

    /**
     * 删除CNode，返回parent，不需要删除CNode与其子节点的联系，
     * @param cNode CNode
     */
    protected alter_delete(cNode: CNode) {
        const parent = cNode.parent as CNode;
        const index = parent.children.indexOf(cNode);
        parent.children.splice(index, 1);
        cNode.parent = null;
        if (index !== 0) {
            parent.children[index - 1].next = cNode.next;
        }
        cNode.next = null;

        return parent
    }
}

let testId = 0;

/**
 * 1 接受Action
 * 2.1 生产CNode
 * 2.2 完成CNode的编排
 * 2.3 渲染视图(这一步)
 */
class CNodeTree extends CNodeTreeBase {
    static cNodes = cNode_collection;

    root: CNode | null;
    constructor() {
        super();
        this.root = null;
        this.bootstrap();
    }

    // 暴露，接收Action
    receive() {

    }

    // 生产一个具体的cNode节点 todo
    produce(
        ComponentCategory: T_componentCategory, componentName: T_ComponentName,
    ) {
        const classFunc = CNodeTree.cNodes[componentName];
        const cNode_real = new classFunc(
            String(++testId), null, null, [],
        );
        return cNode_real
    }

    createRoot_fortest() { // todelete
        this.root = this.produce('root', 'root');
        const container = this.produce('layout', 'container');
        this.alter_appendAsChild_last(container, this.root);
    }
    bootstrap() {
        this.createRoot_fortest();
        testRender(this.root as CNode);
    }
}

const cNodeTree = new CNodeTree();
cNodeTree.bootstrap();

(window as any).CNodeTree = CNodeTree; // todelete
