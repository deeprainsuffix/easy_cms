import React from 'react';
import { Container_cNode_meta } from './Container_CNode';
import { CNode_UI_Left_Drag } from '../Wrapper_CNode_UI_Left/CNode_UI_Left_Drag';

export function Container_CNode_UI_Left() {
    return (
        <CNode_UI_Left_Drag componentName={Container_cNode_meta.componentName}>
            <div>表单容器</div>
        </CNode_UI_Left_Drag>
    )
}