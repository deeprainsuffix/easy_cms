import React from 'react';
import type { T_CNode } from '../index.type';

interface I_WrapperDropAsChild extends React.InputHTMLAttributes<HTMLDivElement> {
    isDropTarget: T_CNode['isDropTarget'];
    canDrop: boolean;
};

export function WrapperDropAsChild({ isDropTarget, canDrop, className }: I_WrapperDropAsChild) {
    if (!isDropTarget) {
        return null
    }

    const borderColor = canDrop ? 'var(--dropTargetTip)' : 'var(--dropTargetTip-ban)';

    return (
        <>
            <div style={{ borderTopColor: borderColor }} className='absolute top-0 left-0 right-0 border-t-[4px] border-solid border-dropTargetTip'></div>
            <div style={{ borderBottomColor: borderColor }} className='absolute bottom-0 left-0 right-0 border-b-[4px] border-solid border-dropTargetTip'></div>
            <div style={{ borderLeftColor: borderColor }} className='absolute left-0 top-0 bottom-0 border-l-[4px] border-solid border-dropTargetTip'></div>
            <div style={{ borderRightColor: borderColor }} className='absolute right-0 top-0 bottom-0 border-r-[4px] border-solid border-dropTargetTip'></div>
        </>
    )
}