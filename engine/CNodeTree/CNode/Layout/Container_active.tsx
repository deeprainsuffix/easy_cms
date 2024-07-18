import React, { type ReactNode } from 'react';
import type { Container_cNode } from './container_cNode';
import { Container } from '@/components/ui/container';
import { ActiveDrag } from '../ActiveWrap/ActiveDrag';
import { ActiveDropAsChild } from '../ActiveWrap/ActiveDropAsChild';
import { ActiveMouse } from '../ActiveWrap/ActiveMouse';

interface I_Container_active {
    cNode: Container_cNode;
    children: React.ReactNode[];
}
export function Container_active(props: I_Container_active) {
    const { cNode, children } = props;

    return (
        <div id={cNode.id} ref={cNode.ref}>
            <ActiveMouse cNode={cNode}>
                <ActiveDropAsChild cNode={cNode}>
                    <ActiveDrag cNode={cNode}>
                        <Container children={children.length ? children : null} />
                    </ActiveDrag>
                </ActiveDropAsChild >
            </ActiveMouse>
        </div >
    )
}