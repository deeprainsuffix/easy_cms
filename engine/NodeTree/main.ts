import { CNode } from './CNode/index'
import { testRender } from '../../client'

class CNodeTreeBase {
    constructor() {

    }

    // 暴露，接收Action
    receive() {

    }

    // 生产一个节点
    produce() {
        const cNode = new CNode(null, null, []);
        return cNode
    }

    /**
     * 将CNode添加到parent成为其最后一个子节点，返回parent
     * @param CNode CNode
     * @param parent CNode
     * @returns parent
     */
    private alter_appendAsChild_last(CNode: CNode, parent: CNode) {
        const prev = parent.children[parent.children.length - 1];
        if (prev) {
            prev.next = CNode;
        }
        parent.children.push(CNode);
        CNode.parent = parent;

        return parent
    }

    // 将CNode添加到parent成为其第一个子节点，返回parent
    private alter_appendAsChild_first(CNode: CNode, parent: CNode) {
        const next = parent.children[0];
        if (next) {
            CNode.next = next;
        }
        parent.children.unshift(CNode);
        CNode.parent = parent;

        return parent
    }

    /**
     * 将CNode添加成为refCNode的下一个兄弟节点，返回parent
     * @param CNode CNode
     * @param refCNode CNode
     * @returns parent
     */
    private alter_appendAsNext(CNode: CNode, refCNode: CNode) {
        const parent = refCNode.parent as CNode;
        if (!refCNode.next) {
            return this.alter_appendAsChild_last(CNode, parent);
        }

        const index = parent.children.indexOf(refCNode);
        parent.children.splice(index + 1, 0, CNode);
        CNode.parent = parent;
        CNode.next = refCNode.next;
        refCNode.next = CNode;

        return parent
    }

    // 将CNode添加成为refCNode的上一个兄弟节点，返回parent
    private alter_appendAsPrev(CNode: CNode, refCNode: CNode) {
        const parent = refCNode.parent as CNode;
        const index = parent.children.indexOf(refCNode);
        if (index === 0) {
            return this.alter_appendAsChild_first(CNode, parent);
        }

        parent.children.splice(index, 0, CNode);
        CNode.parent = parent;
        CNode.next = refCNode;
        parent.children[index - 1].next = CNode;

        return parent
    }

    /**
     * 删除CNode，返回parent，不需要删除CNode与其子节点的联系，
     * @param CNode CNode
     */
    private alter_delete(CNode: CNode) {
        const parent = CNode.parent as CNode;
        const index = parent.children.indexOf(CNode);
        parent.children.splice(index, 1);
        CNode.parent = null;
        if (index !== 0) {
            parent.children[index - 1].next = CNode.next;
        }
        CNode.next = null;

        return parent
    }
}

/**
 * 1 接受Action
 * 2.1 生产CNode
 * 2.2 完成CNode的编排
 * 2.3 渲染视图(这一步)
 */
class CNodeTree extends CNodeTreeBase {
    root: CNode;
    constructor() {
        super();
        this.root = this.produce();
    }

    bootstrap() {
        testRender()
    }
}

const cNodeTree = new CNodeTree();
cNodeTree.bootstrap();

(window as any).CNodeTree = CNodeTree; // todelete
