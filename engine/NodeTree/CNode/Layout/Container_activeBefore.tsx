import React from 'react';
import type { E_componentCategory, E_componentName_layout } from '../type';

interface I_Props {
    componentCategory: E_componentCategory.layout;
    componentName: E_componentName_layout.container;
}

export function closure(preset: I_Props) {
    return function Container_activeBefore() {
        return (
            <div>我是容器左侧</div>
        )
    }
}
