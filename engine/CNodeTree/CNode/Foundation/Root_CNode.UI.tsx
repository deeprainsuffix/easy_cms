import React, { useEffect } from 'react';
import type { Root_CNode } from './Root_CNode';
import { CNode_UI_DropAsChild } from '../Wrapper_CNode_UI/CNode_UI_DropAsChild';
import { CNode_UI_Mouse } from '../Wrapper_CNode_UI/CNode_UI_Mouse';
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

    return (
        <div
            id={cNode.id} ref={cNode.ref}
            className='h-full bg-s200'
        >
            <CNode_UI_Mouse cNode={cNode} className='h-full'>
                <CNode_UI_DropAsChild cNode={cNode} className='h-full'>
                    <div id='scrollBox' className='h-full overflow-y-auto'>
                        {children}
                    </div>
                </CNode_UI_DropAsChild>
            </CNode_UI_Mouse>
        </div>
    )
}