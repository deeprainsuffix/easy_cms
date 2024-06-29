import React from 'react';
import { Container_cNode_meta } from './container_cNode';

function Container_activeBefore() {
    return (
        <div>我是容器左侧</div>
    )
}

export default {
    ...Container_cNode_meta,
    ReactComponentFuncBefore: Container_activeBefore,
}