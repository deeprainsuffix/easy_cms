import React from 'react';
import type { Input_cNode } from './Input_cNode';
import { Input } from '@/components/ui/input';
import { ActiveDrag } from '../ActiveWrap/ActiveDrag';
import { ActiveDropAsSibling } from '../ActiveWrap/ActiveDropAsSibling';
import { ActiveMouse } from '../ActiveWrap/ActiveMouse';

interface I_Input_active {
    cNode: Input_cNode;
}

export function Input_active(props: I_Input_active) {
    const { cNode } = props;

    return (
        <div id={cNode.id} ref={cNode.ref}>
            <ActiveMouse cNode={cNode}>
                <ActiveDropAsSibling cNode={cNode}>
                    <ActiveDrag cNode={cNode}>
                        <Input placeholder={`输入框${cNode.id}`} />
                    </ActiveDrag>
                </ActiveDropAsSibling>
            </ActiveMouse>
        </div>
    )
}