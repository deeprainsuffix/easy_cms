import { CNode } from './CNode/index'
import { testRender } from '../../client'
import cNode_collection from './CNode/cNode_collection';
import type { T_ComponentName } from './CNode/type';

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
            cNode.pos = parent.children.length;
        } else {
            if (parent.children[pos]) {
                parent.children.splice(pos, 0, cNode);
            } else {
                parent.children[pos] = cNode;
            }
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

let testId = 0; // todelete

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
    public receive() {

    }

    // 生产一个具体的cNode节点 todo
    private produce(
        componentName: T_ComponentName,
    ) {
        const classFunc = CNodeTree.cNodes[componentName];
        const cNode_real = new classFunc(
            String(++testId), null, -1, [],
        );
        return cNode_real
    }

    createRoot_fortest() { // todelete
        this.root = this.produce('root');
        const container = this.produce('container');
        this.alter_appendAsChild(container, this.root);
    }
    public bootstrap() {
        this.createRoot_fortest();
        testRender(this.root as CNode);
    }
}

const cNodeTree = new CNodeTree();
cNodeTree.bootstrap();

(window as any).CNodeTree = CNodeTree; // todelete
