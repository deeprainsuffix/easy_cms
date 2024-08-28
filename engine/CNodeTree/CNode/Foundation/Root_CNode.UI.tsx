import React, { useCallback, useEffect } from 'react';
import type { Root_CNode } from './Root_CNode';
import { T_condition_dropAsChild, useCNode_UI_DropAsChild } from '../useCNode_UI/useCNode_UI.DropAsChild';
import { WrapperDropAsChild } from '../useCNode_UI/Wrapper.DropAsChild';
import { useCNode_UI_Mouse } from '../useCNode_UI/useCNode_UI.Mouse';
import { actionController } from '@/engine/ActionController';
import { ActionTip_type_select_update } from '@/engine/ActionController/ActionTip';

interface I_Root_CNode_UI {
    cNode: Root_CNode;
    children: React.ReactNode[];
}

export function Root_CNode_UI({ cNode, children }: I_Root_CNode_UI) {
    const { cssStyle } = cNode;
    useEffect(() => {
        const handleScroll = () => {
            actionController.dispatchAction({
                type: ActionTip_type_select_update,
            });
        };
        const scrollBox = document.querySelector('#scrollBox') as HTMLDivElement;
        scrollBox.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            scrollBox.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const { onClick } = useCNode_UI_Mouse(cNode);
    const condition_drop = useCallback<T_condition_dropAsChild>((componentName, componentCategory) => {
        if (componentCategory === 'layout') {
            return true
        }

        return false
    }, []);
    const { onDragEnter, onDragOver, onDrop, canDrop } = useCNode_UI_DropAsChild(cNode, condition_drop);

    return (
        <div
            id={cNode.id} ref={cNode.ref}
            style={{ ...cssStyle }}
            className='h-full bg-s200 relative'
            onClick={onClick}
            onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop}
        >
            <div id='scrollBox' className='h-full overflow-y-auto'>
                {children}
            </div>
            <WrapperDropAsChild isDropTarget={cNode.isDropTarget} canDrop={canDrop.current.value} />
        </div>
    )
}