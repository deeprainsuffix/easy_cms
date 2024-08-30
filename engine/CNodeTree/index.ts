import { lifeCycle_afterDomMounted } from './CNode/index'
import { testRender } from '../../client'
import { CNode_collection } from './CNode/CNode.collection';
import type { I_CNode_JSON, T_CNode } from './CNode/index.type';
import {
  T_ActionCNode,
  ActionCNode_type_add, ActionCNode_type_copy, ActionCNode_type_delete, ActionCNode_type_move, ActionCNode_type_re_add,
} from '../ActionController/ActionCNode';
import {
  T_ActionTip,
  ActionTip_type_select, ActionTip_type_select_none,
  ActionTip_type_select_update,
  ActionTip_type_drag_start, ActionTip_type_dropTarget_update, ActionTip_type_dropTarget_none,
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
import { ActionCNodeCssStyle_type_update, T_ActionCNodeCssStyle } from '../ActionController/ActionCNodeCssStyle';

/**
 * 节点操作
 */
abstract class CNodeTree_base {
  private static cNodeMap = new Map<T_CNode['id'], T_CNode>();
  static getCNode(id: T_CNode['id']): T_CNode {
    // 程序逻辑保证这个调用一定返回CNode
    return this.cNodeMap.get(id)!
  }
  static setCNode(id: T_CNode['id'], cNode: T_CNode) {
    this.cNodeMap.set(id, cNode)
  }

  protected root: Root_CNode; // 节点树的根节点，保证存在
  private renderCNodes: T_CNode[]; // 待render的cNode

  constructor() {
    this.root = this.produce('Root');
    this.renderCNodes = [];
  }

  // 生产一个cNode节点
  protected produce<T extends T_CNode['componentName']>(componentName: T, id?: T_CNode['id']): InstanceType<typeof CNode_collection[T]> {
    id = id || String(idGenerator.gene());
    const cNode = new CNode_collection[componentName](id, null, -1, []) as InstanceType<typeof CNode_collection[T]>;
    CNodeTree.setCNode(id, cNode);

    return cNode
  }

  /**
   * 复制一个节点
   * 已添加的声明周期函数不复制
   * 复制属性: props cssStyle
   * @param cNode 
   * @returns 
   */
  protected clone<T extends T_CNode>(cNode: T, id?: T_CNode['id']) {
    const clonedCNode = this.produce<T['componentName']>(cNode.componentName, id);
    Object.assign(clonedCNode, {
      props: deepClone(cNode.props),
      cssStyle: deepClone(cNode.cssStyle),
    });

    return clonedCNode
  }

  /**
   * 复制以cNode为根的节点树
   * @param cNode 
   * @param id 
   * @returns 新的复制节点
   */
  protected clone_tree(cNode: T_CNode, id?: T_CNode['id']) {
    const copyedCNode = this.clone(cNode, id);
    cNode.children.forEach((child, i) => {
      copyedCNode.children[i] = child ? this.clone_tree(child) : null;
    });

    return copyedCNode
  }

  /**
   * 将cNode添加到parent，根据传入的pos或cNode的的pos
   * @param cNode 
   * @param parent 
   * @returns parent
   */
  protected alter_appendAsChild(cNode: T_CNode, parent: T_CNode, pos: number = cNode.pos): T_CNode {
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
   * @param cNode 
   * @param refCNode 
   * @returns parent
   */
  protected alter_appendAsNext(cNode: T_CNode, refCNode: T_CNode): T_CNode {
    if (!refCNode.parent) {
      throw 'alter_appendAsNext出错 -> parent为空'
    }

    return this.alter_appendAsChild(cNode, refCNode.parent, refCNode.pos + 1);
  }

  // 将cNode添加成为refCNode的上一个兄弟节点，返回parent
  protected alter_appendAsPrev(cNode: T_CNode, refCNode: T_CNode) {
    if (!refCNode.parent) {
      throw 'alter_appendAsPrev出错 -> parent为空'
    }
    return this.alter_appendAsChild(cNode, refCNode.parent, refCNode.pos);
  }

  /**
   * 删除cNode，返回parent，不需要删除cNode与其子节点的联系
   * @param cNode 
   */
  protected alter_delete(cNode: T_CNode): T_CNode {
    const parent = cNode.parent;
    if (!parent) {
      throw 'alter_delete出错 -> parent为空'
    }

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
  protected AisAncestorB(cNodeA: T_CNode, cNodeB: T_CNode): boolean {
    let topCNode: T_CNode | null = cNodeB;
    while (topCNode) {
      if (topCNode === cNodeA) {
        return true
      }

      topCNode = topCNode.parent;
    }

    return false
  }

  protected toRender(...cNode: T_CNode[]) {
    this.renderCNodes.push(...cNode);
  }

  protected render() {
    this.renderCNodes.forEach(cNode => {
      cNode.render();
    });
    this.renderCNodes.length = 0;
  }
}

/**
 * 1 接受Action
 * 2 生产、调整CNode
 * 3 渲染视图
 */
abstract class CNodeTree_action extends CNodeTree_base {
  public drag_possible: { // 可能即将要生成的节点信息
    componentName: T_CNode['componentName'] | null;
    componentCategory: T_CNode['componentCategory'] | null;
  };
  public drop_target_cNode: T_CNode | null; // 可能即将被drop的节点
  public selectedCNode: T_CNode | null; // 当前选中的节点
  // selectedCNodeChangeCallbacks: Function[]; // todo selectedCNode更换时触发，这里后续可以再优化，目前直接使用浏览器事件机制，简单
  constructor() {
    super();
    this.drag_possible = {
      componentName: null,
      componentCategory: null,
    };
    this.drop_target_cNode = null;
    this.selectedCNode = null;
  }

  public receiveActionCNode(action: T_ActionCNode) {
    switch (action.type) {
      case ActionCNode_type_add: {
        const { componentName, id, parentId, pos } = action;
        const cNode = this.produce(componentName, id);
        const parent = CNodeTree.getCNode(parentId);
        this.alter_appendAsChild(cNode, parent, pos);
        this.toRender(parent);
        this.render();
      }
        break;
      case ActionCNode_type_re_add: {
        const { id, parentId, pos } = action;
        const cNode = CNodeTree.getCNode(id),
          parent = CNodeTree.getCNode(parentId);
        this.alter_appendAsChild(cNode, parent, pos);
        this.toRender(parent);
        this.render();
      }
        break;
      case ActionCNode_type_copy: {
        const { id, copyId, parentId, pos } = action;
        const copyCNode = CNodeTree.getCNode(copyId),
          parent = CNodeTree.getCNode(parentId);
        const copyedCNode = this.clone_tree(copyCNode, id);
        this.alter_appendAsChild(copyedCNode, parent, pos);
        this.toRender(parent);
        this.render();

        // 这里是cNodeTree模拟了一个actionTip
        copyedCNode.lifeCycleRegister(lifeCycle_afterDomMounted, () => this.receiveActionTip({ type: ActionTip_type_select, id: copyedCNode.id }));
      }
        break;
      case ActionCNode_type_move: {
        const { id, moveFromParentId, moveFromPos, moveToParentId, moveToPos } = action;
        const cNode = CNodeTree.getCNode(id),
          parentTo = CNodeTree.getCNode(moveToParentId);
        if (this.AisAncestorB(cNode, parentTo)) {
          return
        }

        this.toRender(this.alter_delete(cNode), this.alter_appendAsChild(cNode, parentTo, moveToPos));
        this.render();
      }
        break;
      case ActionCNode_type_delete: {
        const { id, prevParentId, pos } = action;
        const cNode = CNodeTree.getCNode(id);
        this.toRender(this.alter_delete(cNode))
        this.receiveActionTip({ type: ActionTip_type_select_none });
        this.render();
      }
        break;
      default:
        throw 'receiveActionCNode出错';
    }
  }

  public receiveActionTip(action: T_ActionTip) {
    switch (action.type) {
      case ActionTip_type_select: {
        const { id } = action;
        const curr_selectedCNode = CNodeTree.getCNode(id);
        if (this.selectedCNode && this.selectedCNode.id === curr_selectedCNode.id) {
          return
        }
        this.selectedCNode = curr_selectedCNode;
        this.toRender(this.selectedCNode);
        this.render();

        // todo 这里直接用浏览器的事件机制，方便
        // 虽然这里的数据更新逻辑和视图更新逻辑没有分开，由各自组件进行 dataUpdate1 -> viewRender1 -> dataUpdate2 -> viewRender2 -> ...
        // 但，react会将其改为 dataUpdate1 -> dataUpdate2 => ... -> viewRender1 -> viewRender2 -> ...
        // todo 不过后续在render函数逻辑上可以顺成上述过程
        window.dispatchEvent(new CustomEvent(custom_eType_selectedCNodeChange, { detail: { selectedCNode: this.selectedCNode } }));
      }
        break;
      case ActionTip_type_select_none: {
        this.selectedCNode = null;
        window.dispatchEvent(new CustomEvent(custom_eType_selectedCNodeChange, { detail: { selectedCNode: this.selectedCNode } }));
      }
        break;
      case ActionTip_type_select_update: {
        window.dispatchEvent(new CustomEvent(custom_eType_selectedCNodeUpdate, { detail: { selectedCNode: this.selectedCNode } }));
      }
        break;
      case ActionTip_type_drag_start: {
        const { componentName, componentCategory } = action;
        this.drag_possible.componentName = componentName;
        this.drag_possible.componentCategory = componentCategory;
      }
        break;
      case ActionTip_type_dropTarget_update: {
        const { id } = action;
        if (this.drop_target_cNode) {
          this.drop_target_cNode.isDropTarget = false;
          this.toRender(this.drop_target_cNode);
        }
        this.drop_target_cNode = CNodeTree.getCNode(id);
        this.drop_target_cNode.isDropTarget = true;
        this.toRender(this.drop_target_cNode);
        this.render();
      }
        break;
      case ActionTip_type_dropTarget_none: {
        this.drag_possible.componentName = null;
        this.drag_possible.componentCategory = null;
        if (this.drop_target_cNode) {
          this.drop_target_cNode.isDropTarget = false;
          this.toRender(this.drop_target_cNode);
          this.drop_target_cNode = null;
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
        // @ts-ignore 保证
        targetNode.props[prop] = value;
        this.toRender(targetNode);
        this.render();
        break;
    }
  }

  public receiveActionCNodeCssStyle(action: T_ActionCNodeCssStyle) {
    switch (action.type) {
      case ActionCNodeCssStyle_type_update:
        const { id, cssStyle } = action;
        const targetNode = CNodeTree.getCNode(id);
        targetNode.cssStyle = cssStyle;
        this.toRender(targetNode);
        this.render();
        break;
    }
  }
}

/**
 * 处理CNodeTree转换为JSON
 */
abstract class CNodeTree_JSON extends CNodeTree_action {
  constructor() {
    super();
  }

  /**
   * 生成以cNode为根节点的cNode_json和cNode_hash
   * @param cNode 
   * @param cNode_hashSource 
   * @returns 
   */
  private to_cNode_JSON(cNode: T_CNode, cNode_hashSource: T_cNode_hashSource): I_CNode_JSON {
    const cNode_JSON = {
      id: cNode.id,
      componentCategory: cNode.componentCategory,
      componentName: cNode.componentName,
      title: cNode.title,
    } as I_CNode_JSON;

    cNode_hashSource.push(
      cNode.id,
      cNode.componentCategory,
      cNode.componentName,
      cNode.title,
    );

    cNode_JSON.props = deepClone_forHash(cNode.props, cNode_hashSource);
    cNode_JSON.cssStyle = deepClone_forHash(cNode.cssStyle, cNode_hashSource);
    cNode_JSON.children = cNode.children.filter((c): c is T_CNode => c !== null).map(c => this.to_cNode_JSON(c, cNode_hashSource));

    return cNode_JSON
  }

  public async getCNodeTreeJSON(): Promise<{ cNodeTree_JSON: I_CNode_JSON, cNodeTree_hash: string }> {
    const cNode_hashSource: T_cNode_hashSource = [];
    const cNodeTree_JSON = this.to_cNode_JSON(this.root, cNode_hashSource);
    const cNodeTree_hash = await digest_cNode_hashSource(cNode_hashSource);

    return { cNodeTree_JSON, cNodeTree_hash }
  }
}

class CNodeTree extends CNodeTree_JSON {
  constructor() {
    super();
  }

  private create_baseView() {
    const formBlock1 = this.produce('FormBlock');
    const input1 = this.produce('Input');
    this.alter_appendAsChild(input1, formBlock1);

    const formBlock2 = this.produce('FormBlock');
    this.alter_appendAsChild(formBlock1, this.root);
    this.alter_appendAsChild(formBlock2, this.root);
  }

  public bootstrap() {
    this.create_baseView();
    testRender(this.root);
  }
}

export const cNodeTree = new CNodeTree();
cNodeTree.bootstrap();