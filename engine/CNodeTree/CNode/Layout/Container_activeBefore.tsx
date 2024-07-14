import React from 'react';
import { Container_cNode_meta } from './container_cNode';
import { ActiveBeforeDrag } from '../ActiveBeforeWrap/ActiveBeforeDrag';

export function Container_activeBefore() {
    return (
        <ActiveBeforeDrag componentName={Container_cNode_meta.componentName}>
            <div>我是容器左侧</div>
        </ActiveBeforeDrag>
    )
}