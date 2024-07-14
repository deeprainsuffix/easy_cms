import React from 'react';
import type { Input_cNode } from './Input_cNode';
import { Input } from '@/components/ui/input';
import { ActiveDrag } from '../ActiveWrap/ActiveDrag';
import { ActiveDropAsSibling } from '../ActiveWrap/ActiveDropAsSibling';

interface I_Input_active {
    cNode: Input_cNode;
}

export function Input_active(props: I_Input_active) {
    const { cNode } = props;

    return (
        <ActiveDropAsSibling cNode={cNode}>
            <ActiveDrag cNode={cNode}>
                <div id={cNode.id}>
                    <Input placeholder={`输入框${cNode.id}`} />
                </div>
            </ActiveDrag>
        </ActiveDropAsSibling>
    )
}