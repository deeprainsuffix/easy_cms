import React, { useEffect } from 'react';
import type { Root_CNode } from './Root_CNode';
import { useCNode_UI_DropAsChild } from '../useCNode_UI/useCNode_UI.DropAsChild';
import { useCNode_UI_Mouse } from '../useCNode_UI/useCNode_UI.Mouse';
import { actionController } from '@/engine/ActionController';
import { ActionTip_type_select_update } from '@/engine/ActionController/ActionTip';

interface I_Root_CNode_UI {
    cNode: Root_CNode;
    children: React.ReactNode[];
}

export function Root_CNode_UI(props: I_Root_CNode_UI) {
    const { cNode, children } = props;
    useEffect(() => {
        const handleScroll = () => {
            actionController.dispatchAction({
                type: ActionTip_type_select_update,
            });
        };
        const scrollBox = document.querySelector('#scrollBox') as HTMLDivElement;
        scrollBox.addEventListener('scroll', handleScroll, false);

        return () => {
            scrollBox.removeEventListener('scroll', handleScroll, false);
        }
    }, []);

    const { onClick } = useCNode_UI_Mouse(cNode);
    const { onDragEnter, onDragOver, onDrop } = useCNode_UI_DropAsChild(cNode);

    return (
        <div
            id={cNode.id} ref={cNode.ref}
            className='h-full bg-s200'
            onClick={onClick}
            onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop}
        >
            <div id='scrollBox' className='h-full overflow-y-auto'>
                {children}
            </div>
        </div>
    )
}