import React, { type ReactNode } from 'react';
import type { Container_cNode } from './container_cNode';
import { Container } from '@/components/ui/container';
import { ActiveDrag } from '../ActiveWrap/ActiveDrag';
import { ActiveDropAsChild } from '../ActiveWrap/ActiveDropAsChild';

interface I_Container_active {
    cNode: Container_cNode;
    children: React.ReactNode[];
}
export function Container_active(props: I_Container_active) {
    const { cNode, children } = props;

    return (
        <ActiveDropAsChild cNode={cNode}>
            <ActiveDrag cNode={cNode}>
                <div id={cNode.id}>
                    <Container children={children.length ? children : null} />
                </div>
            </ActiveDrag>
        </ActiveDropAsChild >
    )
}