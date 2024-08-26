import { CNode, lifeCycle_afterDomMounted } from './CNode/index'
import { testRender } from '../../client'
import { CNode_collection } from './CNode/CNode.collection';
import type { I_CNode_JSON, T_CNode_Concrete, T_ComponentName } from './CNode/index.type';
import {
  T_ActionCNode,
  ActionCNode_type_add, ActionCNode_type_copy, ActionCNode_type_delete, ActionCNode_type_move, ActionCNode_type_re_add,
} from '../ActionController/ActionCNode';
import {
  T_ActionTip,
  ActionTip_type_select, ActionTip_type_select_none,
  ActionTip_type_select_update,
  ActionTip_type_dropTarget_update,
  ActionTip_type_dropTarget_none
} from '../ActionController/ActionTip';
import {
  T_ActionCNodeProps,
  ActionCNodeProps_type_update,
} from '../ActionController/ActionCNodeProps';
import { custom_eType_selectedCNodeChange, custom_eType_selectedCNodeUpdate } from '../Operator/dependOnSelectedCNode';
import { deepClone } from '@/lib/utils';
import { idGenerator } from '../IdGenerator';
import { deepClone_forHash, digest_cNode_hashSource, type T_cNode_hashSource } from '../lib/utils';
import type { Root_CNode } from './CNode/Foundation/Root_CNode';

class CNodeTreeBase {
  constructor() {

  }

  /**
   * 将cNode添加到parent，根据传入的pos或cNode的的pos
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
   * 删除cNode，返回parent，不需要删除cNode与其子节点的联系
   * @param cNode CNode
   */
  protected alter_delete(cNode: CNode) {
    const parent = cNode.parent as CNode;
    parent.children[cNode.pos] = null;
    cNode.parent = null;
    cNode.pos = -1;

    return parent
  }

  /**
   * 判断cNodeA是否是cNodeB的祖先(包括相等的情况)
   * @param cNodeA 
   * @param cNodeB 
   */
  protected AisAncestorB(cNodeA: CNode, cNodeB: CNode) {
    let topCNode: CNode | null = cNodeB;
    while (topCNode) {
      if (topCNode === cNodeA) {
        return true
      }

      topCNode = topCNode.parent;
    }

    return false
  }
}

/**
 * 1 接受Action
 * 2.1 生产CNode
 * 2.2 完成CNode的编排
 * 2.3 渲染视图(这一步)
 */
class CNodeTree extends CNodeTreeBase {
  static cNodeMap = new Map<string, CNode>(); // 这里挂静态属性还是实例属性没啥区别
  static getCNode(id: string) {
    // 程序逻辑保证这个调用一定返回CNode
    return this.cNodeMap.get(id)!
  }
  static setCNode(id: string, cNode: CNode) {
    this.cNodeMap.set(id, cNode)
  }

  root: Root_CNode; // 节点数的根节点，保证存在
  renderCNodes: CNode[]; // 待render的cNode
  selectedCNode: CNode | null; // 当前选中的节点
  dropTargetCNode: CNode | null; // 即将被drop的节点
  // selectedCNodeChangeCallbacks: Function[]; // todo selectedCNode更换时触发，这里后续可以再优化，目前直接使用浏览器事件机制，简单

  constructor() {
    super();
    this.root = {} as Root_CNode;
    this.renderCNodes = [];
    this.selectedCNode = null;
    this.dropTargetCNode = null;

    // this.selectedCNodeChangeCallbacks = [];


    this.bootstrap();
  }

  // 暴露，接收Action，根据各种action进行节点生产或调度，之后刷新视图
  public receiveActionCNode(action: T_ActionCNode) {
    switch (action.type) {
      case ActionCNode_type_add: {
        const { componentName, id, parentId, pos } = action;
        const cNode = this.produce(componentName, id);
        const parent = CNodeTree.getCNode(parentId);
        this.renderCNodes.push(this.alter_appendAsChild(cNode, parent, pos));
      }
        break;
      case ActionCNode_type_re_add: {
        const { id, parentId, pos } = action;
        const cNode = CNodeTree.getCNode(id),
          parent = CNodeTree.getCNode(parentId);
        this.renderCNodes.push(this.alter_appendAsChild(cNode, parent, pos));
      }
        break;
      case ActionCNode_type_copy: {
        const { id, copyId, parentId, pos } = action;
        const copyCNode = CNodeTree.getCNode(copyId),
          parent = CNodeTree.getCNode(parentId);
        let startId = +id;
        const copyDfs = (cNode: CNode, parent: CNode, pos: number) => {
          const copyedCNode = this.clone(cNode, String(startId++));
          this.alter_appendAsChild(copyedCNode, parent, pos);
          cNode.children.forEach((child, i) => {
            copyedCNode.children[i] = child ? copyDfs(child, copyedCNode, i) : null;
          });

          return copyedCNode
        }
        const copyedCNode = copyDfs(copyCNode, parent, pos);
        idGenerator.update(startId - 1);
        // 这里是cNodeTree模拟了一个actionTip
        copyedCNode.lifeCycleRegister(lifeCycle_afterDomMounted, () => this.receiveActionTip({ type: ActionTip_type_select, id: copyedCNode.id }));
        this.renderCNodes.push(parent);
      }
        break;
      case ActionCNode_type_move: {
        const { id, moveFromParentId, moveFromPos, moveToParentId, moveToPos } = action;
        const cNode = CNodeTree.getCNode(id),
          // parentFrom = CNodeTree.getCNode(moveFromParentId),
          parentTo = CNodeTree.getCNode(moveToParentId);
        if (this.AisAncestorB(cNode, parentTo)) {
          return
        }

        this.renderCNodes.push(this.alter_delete(cNode));
        this.renderCNodes.push(this.alter_appendAsChild(cNode, parentTo, moveToPos));
      }
        break;
      case ActionCNode_type_delete: {
        const { id, prevParentId, pos } = action;
        const cNode = CNodeTree.getCNode(id);
        this.renderCNodes.push(this.alter_delete(cNode));
        this.receiveActionTip({ type: ActionTip_type_select_none });
      }
        break;
      default:
        throw 'receiveActionCNode失败';
    }

    this.render();
  }

  public receiveActionTip(action: T_ActionTip) {
    switch (action.type) {
      case ActionTip_type_select: {
        const { id } = action;
        this.selectedCNode = CNodeTree.getCNode(id);
        this.renderCNodes.push(this.selectedCNode);
        // todo 这里直接用浏览器的事件机制，方便
        // 虽然这里的数据更新逻辑和视图更新逻辑没有分开，由各自组件进行 dataUpdate1 -> viewRender1 -> dataUpdate2 -> viewRender2 -> ...
        // 但，react会将其改为 dataUpdate1 -> dataUpdate2 => ... -> viewRender1 -> viewRender2 -> ...
        // todo 不过后续在render函数逻辑上可以顺成上述过程
        window.dispatchEvent(new CustomEvent(custom_eType_selectedCNodeChange, { detail: { selectedCNode: this.selectedCNode } }));
        this.render();
      }
        break;
      case ActionTip_type_select_none: {
        if (this.selectedCNode) {
          this.renderCNodes.push(this.selectedCNode);
        }
        this.selectedCNode = null;
        window.dispatchEvent(new CustomEvent(custom_eType_selectedCNodeChange, { detail: { selectedCNode: this.selectedCNode } }));
        this.render();
      }
        break;
      case ActionTip_type_select_update: {
        window.dispatchEvent(new CustomEvent(custom_eType_selectedCNodeUpdate, { detail: { selectedCNode: this.selectedCNode } }));
      }
        break;
      case ActionTip_type_dropTarget_update: {
        const { id } = action;
        if (this.dropTargetCNode) {
          this.dropTargetCNode.isDropTarget = false;
          this.renderCNodes.push(this.dropTargetCNode);
        }
        this.dropTargetCNode = CNodeTree.getCNode(id);
        this.dropTargetCNode.isDropTarget = true;
        this.renderCNodes.push(this.dropTargetCNode);
        this.render();
      }
        break;
      case ActionTip_type_dropTarget_none: {
        if (this.dropTargetCNode) {
          this.dropTargetCNode.isDropTarget = false;
          this.renderCNodes.push(this.dropTargetCNode);
          this.dropTargetCNode = null;
          this.render();
        }
      }
        break;
    }
  }

  public receiveActionCNodeProps(action: T_ActionCNodeProps) {
    switch (action.type) {
      case ActionCNodeProps_type_update:
        const { id, prop, value } = action;
        const targetNode = CNodeTree.getCNode(id);
        targetNode.props[prop] = value;
        this.renderCNodes.push(targetNode);
        break;
    }

    this.render();
  }

  // 生产一个具体的cNode节点 todo
  private produce(
    componentName: T_ComponentName,
    id: string,
  ) {
    const CNodeClassFunc = CNode_collection[componentName];
    const cNode = new CNodeClassFunc(
      id, null, -1, [],
    );
    CNodeTree.setCNode(id, cNode); // 其实这里不属于produce的任务

    return cNode
  }

  /**
   * 可能会加一个options选项，确定clone项是否要把生命周期之类的克隆 todo
   * clone的属性包括: 
   * componentCategory componentName
   * title
   * isDraggable isDroppable
   * props cssStyle
   * @param cNode 
   * @returns 
   */
  private clone(cNode: CNode, id: string) {
    const clonedCNode = this.produce(cNode.componentName, id);
    Object.assign(clonedCNode, {
      componentCategory: cNode.componentCategory, componentName: cNode.componentName,
      title: cNode.title,
      isDraggable: cNode.isDraggable, isDroppable: cNode.isDroppable,
      props: deepClone(cNode.props),
      cssStyle: deepClone(cNode.cssStyle),
    });

    return clonedCNode
  }

  private render() {
    this.renderCNodes.forEach(renderNode => {
      renderNode.render();
    });
    this.renderCNodes.length = 0;
  }

  // 生成cNodeTree_JSON和cNodeTree_hash
  public async getCNodeTreeJSON(): Promise<{ cNodeTree_JSON: I_CNode_JSON, cNodeTree_hash: string }> {
    const jsonCNode = (cNode: CNode, cNode_hashSource: T_cNode_hashSource): I_CNode_JSON => {
      const cNode_JSON = {
        id: cNode.id, pos: cNode.pos,
        componentCategory: cNode.componentCategory, componentName: cNode.componentName,
        title: cNode.title,
      } as I_CNode_JSON;

      cNode_hashSource.push(
        cNode.id, cNode.pos,
        cNode.componentCategory, cNode.componentName,
        cNode.title,
      );

      cNode_JSON.props = deepClone_forHash(cNode.props, cNode_hashSource);
      cNode_JSON.cssStyle = deepClone_forHash(cNode.cssStyle, cNode_hashSource);

      cNode_JSON.children = cNode.children.filter((c): c is CNode => c !== null).map(c => jsonCNode(c, cNode_hashSource));

      return cNode_JSON
    }

    const cNode_hashSource: T_cNode_hashSource = [];
    const cNodeTree_JSON = jsonCNode(this.root, cNode_hashSource);
    const cNodeTree_hash = await digest_cNode_hashSource(cNode_hashSource);

    return { cNodeTree_JSON, cNodeTree_hash }
  }

  createRoot_fortest() { // todelete
    this.root = this.produce('Root', String(idGenerator.gene())) as Root_CNode;
    const formBlock = this.produce('FormBlock', String(idGenerator.gene()));
    this.alter_appendAsChild(formBlock, this.root);
  }

  public bootstrap() {
    this.createRoot_fortest();
    testRender(this.root);
  }
}

// todo
export const cNodeTree = new CNodeTree();
cNodeTree.bootstrap();

(window as any).CNodeTree = CNodeTree; // todelete
