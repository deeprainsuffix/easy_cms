import React from 'react';
import { CNode_UI_Left_Drag } from '../Wrapper_CNode_UI_Left/CNode_UI_Left_Drag';
import { Input_cNode_meta } from './Input_CNode';


export function Input_CNode_UI_Left() {
    return (
        <CNode_UI_Left_Drag componentName={Input_cNode_meta.componentName}>
            <div>输入框</div>
        </CNode_UI_Left_Drag>
    )
}