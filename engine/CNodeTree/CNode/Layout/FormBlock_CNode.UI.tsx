import React from 'react';
import type { FormBlock_CNode } from './FormBlock_CNode';
import { CNode_UI_Drag } from '../Wrapper_CNode_UI/CNode_UI_Drag';
import { CNode_UI_DropAsChild } from '../Wrapper_CNode_UI/CNode_UI_DropAsChild';
import { CNode_UI_Mouse } from '../Wrapper_CNode_UI/CNode_UI_Mouse';
import { FormBlock } from '@/components/ui_CNode/FormBlock';

interface I_FormBlock_CNode_UI {
    cNode: FormBlock_CNode;
    children: React.JSX.Element[];
}

export function FormBlock_CNode_UI(props: I_FormBlock_CNode_UI) {
    const { cNode, children } = props;
    const { props: { widthRadio, columnNum } } = cNode;

    return (
        <div id={cNode.id} ref={cNode.ref}
            style={{ width: widthRadio, flexBasis: widthRadio }}
            className='my-[4px] first:mt-0 last:mb-0'
        >
            <CNode_UI_Mouse cNode={cNode}>
                <CNode_UI_DropAsChild cNode={cNode}>
                    <CNode_UI_Drag cNode={cNode}>
                        <FormBlock children={children.length ? children : null} props={{ ...cNode.props }} />
                    </CNode_UI_Drag>
                </CNode_UI_DropAsChild >
            </CNode_UI_Mouse>
        </div >
    )
}

// interface I_children_item extends React.JSX.Element {
//     props: {
//         cNode: CNode;
//     };
// }

// interface I_Container extends React.HTMLAttributes<HTMLDivElement> {
//     cNode: Container_CNode;
//     children: I_children_item[] | null;
// }

// todo 这个注释为容器组件保留
// // todo 如果是通用容器，则需要单独针对容器组件特殊处理，grid布局换成flex好处理
// // 宽度占比的含义要改变，包括render也要改，这里暂时没有这个需求
// function Container(props: I_Container) {
//     const { className, children, cNode } = props;
//     const columnNum = +cNode.props.columnNum;

//     return (
//         <div className={`min-h-[70px]
//             border-[1px] border-dashed border-s500 bg-s300
//             `
//         }>
//             {

//                 children
//                     ?
//                     <div className="flex items-center flex-wrap p-[4px]"
//                     >
//                         {children.map(UI => {
//                             return (
//                                 <div
//                                     key={UI.props.cNode.id}
//                                     className='min-h-[60px] flex items-center'
//                                     style={{
//                                         flex: UI.props.cNode.componentName === 'container' ?
//                                             UI.props.cNode.props.widthRadio
//                                             :
//                                             `0 0 ${Math.floor(1 / columnNum * 100)}%`,
//                                     }}>
//                                     {UI}
//                                 </div>
//                             )
//                         })}
//                     </div>
//                     :
//                     <div className='h-[68px] flex justify-center items-center'>容器：待拖入其他组件</div>
//             }
//         </div>
//     )
// }