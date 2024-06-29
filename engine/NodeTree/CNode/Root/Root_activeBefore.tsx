import React from 'react';
import { Root_cNode_meta } from './Root_cNode';

function Root_activeBefore() {
    return (
        <div>我是根左侧</div>
    )
}

export default {
    ...Root_cNode_meta,
    ReactComponentFuncBefore: Root_activeBefore,
}