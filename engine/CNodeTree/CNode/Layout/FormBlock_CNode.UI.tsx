import React, { useCallback } from 'react';
import type { FormBlock_CNode } from './FormBlock_CNode';
import { useCNode_UI_Drag } from '../useCNode_UI/useCNode_UI.Drag';
import { T_condition_dropAsChild, useCNode_UI_DropAsChild } from '../useCNode_UI/useCNode_UI.DropAsChild';
import { WrapperDropAsChild } from '../useCNode_UI/Wrapper.DropAsChild';
import { useCNode_UI_Mouse } from '../useCNode_UI/useCNode_UI.Mouse';
import { FormBlock } from '@/components/ui_CNode/FormBlock';

interface I_FormBlock_CNode_UI {
    cNode: FormBlock_CNode;
    children: React.JSX.Element[];
}

export function FormBlock_CNode_UI({ cNode, children }: I_FormBlock_CNode_UI) {
    const { props: { widthRadio, columnNum }, cssStyle } = cNode;

    const { onClick } = useCNode_UI_Mouse(cNode);
    const condition_drop = useCallback<T_condition_dropAsChild>((componentName, componentCategory) => {
        if (componentCategory === 'form') {
            return true
        }

        return false
    }, []);
    const { onDragEnter, onDragOver, onDrop, canDrop } = useCNode_UI_DropAsChild(cNode, condition_drop);
    const { onDragStart, onDragEnd } = useCNode_UI_Drag(cNode);

    return (
        <div id={cNode.id} ref={cNode.ref}
            style={{ width: widthRadio, flexBasis: widthRadio, ...cssStyle }}
            className='my-[4px] first:mt-0 last:mb-0 relative'
            onClick={onClick}
            onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop}
            onDragStart={onDragStart} draggable onDragEnd={onDragEnd}
        >
            <FormBlock children={children.length ? children : null} props={{ ...cNode.props }} />
            <WrapperDropAsChild isDropTarget={cNode.isDropTarget} canDrop={canDrop.current.value} />
        </div >
    )
}