import React from 'react';
import type { FormBlock_CNode } from './FormBlock_CNode';
import { useCNode_UI_Drag } from '../useCNode_UI/useCNode_UI.Drag';
import { useCNode_UI_DropAsChild } from '../useCNode_UI/useCNode_UI.DropAsChild';
import { WrapperDropAsChild } from '../useCNode_UI/Wrapper.DropAsChild';
import { useCNode_UI_Mouse } from '../useCNode_UI/useCNode_UI.Mouse';
import { FormBlock } from '@/components/ui_CNode/FormBlock';

interface I_FormBlock_CNode_UI {
    cNode: FormBlock_CNode;
    children: React.JSX.Element[];
}

export function FormBlock_CNode_UI(props: I_FormBlock_CNode_UI) {
    const { cNode, children } = props;
    const { props: { widthRadio, columnNum } } = cNode;

    const { onClick } = useCNode_UI_Mouse(cNode);
    const { onDragEnter, onDragOver, onDrop } = useCNode_UI_DropAsChild(cNode);
    const { onDragStart, onDragEnd } = useCNode_UI_Drag(cNode);

    return (
        <div id={cNode.id} ref={cNode.ref}
            style={{ width: widthRadio, flexBasis: widthRadio }}
            className='my-[4px] first:mt-0 last:mb-0 relative'
            onClick={onClick}
            onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop} 
            onDragStart={onDragStart} draggable onDragEnd={onDragEnd}
        >
            <FormBlock children={children.length ? children : null} props={{ ...cNode.props }} />
            <WrapperDropAsChild isDropTarget={cNode.isDropTarget} />
        </div >
    )
}