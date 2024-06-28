import React from 'react';
import type { E_componentCategory, E_componentName_form } from '../type';

interface I_Props {
    componentCategory: E_componentCategory.layout;
    componentName: E_componentName_form.input;
}

export function closure(preset: I_Props) {
    return function Input_activeBefore() {
        return (
            <div>我是容器左侧</div>
        )
    }
}
