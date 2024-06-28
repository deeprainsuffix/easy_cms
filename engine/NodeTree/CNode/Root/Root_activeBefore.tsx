import React from 'react';
import type { E_componentCategory, E_componentName_root } from '../type';

interface I_Props {
    componentCategory: E_componentCategory.root;
    componentName: E_componentName_root.root;
}

export function closure(preset: I_Props) {
    return function Root_activeBefore() {
        return (
            <div>我是根左侧</div>
        )
    }
}
