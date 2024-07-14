import React from 'react';
import { ActiveBeforeDrag } from '../ActiveBeforeWrap/ActiveBeforeDrag';
import { Input_cNode_meta } from './Input_cNode';


export function Input_activeBefore() {
    return (
        <ActiveBeforeDrag componentName={Input_cNode_meta.componentName}>
            <div>我是Input左侧</div>
        </ActiveBeforeDrag>
    )
}