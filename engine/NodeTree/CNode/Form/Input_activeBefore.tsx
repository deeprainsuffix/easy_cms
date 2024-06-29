import React from 'react';
import { Input_cNode_meta } from './Input_cNode';

function Input_activeBefore() {
    return (
        <div>我是容器左侧</div>
    )
}

export default {
    ...Input_cNode_meta,
    ReactComponentFuncBefore: Input_activeBefore,
}