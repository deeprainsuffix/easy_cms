# 后台管理系统生成器

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
    * 需要实现get、set吗？[todo]
    * 尽量完整定义schema [todo]
    * next指针可以删除，改为顺序pos(action_delete)
    * CNode_UI_DropAsSibling中rectRef.current，CNode尺寸信息是否可在生成时初始化？ [todo]
    * move的左右指示tip [todo]
    * 实现copy
      * 先实现CNodeSticker组件 [todo]
      * 可能要实现原型模式 [todo]
      * id发生器一定要与Action耦合，但对于操作copy的CNodeTree，copy后必须更新下一个id值 [done]
      * copy后更新selectedCNode，react组件更新会发生在本次同步任务之后，这边要确保更新之后进行selectedCNode的切换 [todo]
  * alter_ + 函数名，都是引起NodeTree节点变动的操作，返回变动后的最高层节点，以备渲染视图，react diff会确保定点更新
    * 添加子节点 done
    * 添加兄弟节点 done
    * 调换两个节点 [todo] (需要吗？好像没有场景需要调换任意两个节点，像move分成删除和添加就好了)
    * 删除一个节点 done
  * CNodeTree与CNode的类，CNode与对应React组件相关联
    * id发生器 [done]
  * receiveAction的工作有点杂 [done]
  * 考虑删除掉ComponentCategory类，将category及其扩展属性单独添加，或使用生成器模式构造CNode [todo]
  * 实际上，CNodeTree变动后，很多通知其他相关组件更新的逻辑，都要在确定CNodeTree render完成之后进行
  * 当被拖入的组件是给个提示，是拖入左右侧？还是内部？ [todo]
  * CNode_UI_Left可以删除，本想着设计每个组件的独特UI_Left [done]
* Action
  * 一次性提交多个命令 [todo]
  * undo/redo 反命令 [todo]
  * ActionCNodeProps不参与时间旅行 [done]
  * ActionController
  * action需要再加一类，ActionPeripheral，该类不引起cNodeTree的render [todo]，ActionTip_type_select(_none)可能需要移进去
* CNodeSticker
  * 解决CNodeSticker遮挡cNodetree [done]
  * 窗口resize后，要render [todo]
  * 选中根节点时，要隐藏操作器 [todo]
  * 在dragStart和undo、redo时，要隐藏 [done]
  * 当工作区内容撑起滚动条时，以及滚动式，要resize(是否考虑将CNodeSticker与组件绑定)
  * 对于tool的top逻辑是专门针对滚动的，而且未达到预期效果，应该专门区分update的来源，resize、scroll、props、cssStyle等等，以实现更精细化的控制
  * 在scroll时能明显看到edge的更新，最好的方法是将其与CNode耦合，以去掉ActionTip_type_select_update
* SettingRight
  * 向容器和跟组建不需要设Props和CssStyle，在点击之后右侧的显示 [todo]
* undo/redo [todo]
  * 测试项:
    * add -> delete(undo) -> readd(redo) -> delete(undo) -> newAction -> (again) [done]
    * copy -> delete(undo) -> readd(redo) -> delete(undo) -> newAction -> (again) [done]
    * move -> move(undo) -> move(redo) -> move(undo) -> newAction -> (again) [done]
    * delete -> readd(undo) -> delete(redo) -> readd(undo) -> newAction -> (again) [done]
* css
  * dark模式的颜色 [todo]

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

* 搭个页面大体框架，以备开发Right和Action

### 后端

### 行程

* day1
  <!-- * mpg-left样式 -->
  <!-- * CNodeSticker更新 -->
    <!-- * resize -->
    <!-- * 复制引起撑开滚动条时 -->
    <!-- * 滚动 -->
* day1
  * [表单svg](https://www.iconfont.cn/collections/detail?spm=a313x.search_index.0.da5a778a4.255d3a81BFLqRV&cid=3991)
  <!-- * 加一个select组件 -->
  <!-- * 加一个上传文件组件 -->
* day4-5
  * 根据CNode结构生成json，serviceWork
  * 根据json生成前端文件
    * PC
    * m
  * 根据json生成后端文件
* day1 页面预览
  * 生成文件，并缓存，可以节省出码的速度
  * 新建页面
  * 详情页面
* day2 屏幕尺寸
* day2考虑加一个表格
* day1 大纲树
* 解决todo
