# 后台管理系统生成器

## 参考页面

* [大纲树](https://lowcode-engine.cn/demo/demo-general/index.html)
* <https://fyl080801.github.io/vjdesign/example/antd/>

## 产品功能(大方向)

### 一期

* 用户拖拽组件，自行布局管理页面，可预览不同尺寸屏幕的页面效果，可一键生成前端文件(PC端和m端)
* 用户登录系统，用户自定布局页面之后，可保存成为自己的常用模板页

### 二期

* 生成前端文件的同时，生成对应后端文件，之后发布

## 功能细分

### 引擎 —— 实现核心组件

## 06.21

* CNodeTree
  * CNode
    * 需要实现get、set吗？
    * 尽量完整定义schema(b: 06.29, e: 完整不了，先开发组件)
    * next指针可以删除，改为顺序pos(action_delete)，
  * alter_ + 函数名，都是引起NodeTree节点变动的操作，返回变动后的最高层节点，以备渲染视图，react diff会确保定点更新
    * 添加子节点 done
    * 添加兄弟节点 done
    * 调换两个节点 todo (需要吗？好像没有场景需要调换任意两个节点，像move分成删除和添加就好了)
    * 删除一个节点 done
  * CNodeTree与CNode的类，CNode与对应React组件相关联(b: 06.27, e: 06.28)
    * id发生器 todo
* Action(b: 07.01, e: )
  * 一次性提交多个命令 todo
  * redo/undo 反命令 todo
  * ActionCNode_update_props参与时间旅行，可能需要不参与时间旅行的action，则I_CNode_props要拆分 todo
  * ActionController(b: 07.02, e: )

### 前端

#### page1 - 主页面

 ————————————————————————————————————
|              header                |
 ————————————————————————————————————
|            |         |             |
| 可拖拽组件  |   画板  |  组件信息栏  |
|            |         |             |
 ————————————————————————————————————
|              bottom                |
 ————————————————————————————————————

* 搭个页面大体框架，以备开发Right和Action(b: 06.29, e: 06.29)

### 后端
