import React from 'react';
import type { T_CNode_Concrete } from '../index.type';

interface I_WrapperDropAsSibling extends React.InputHTMLAttributes<HTMLDivElement> {
    isDropTarget: T_CNode_Concrete['isDropTarget'];
    isDropLeft: boolean;
};

export function WrapperDropAsSibling({ isDropTarget, isDropLeft, className }: I_WrapperDropAsSibling) {
    if (!isDropTarget) {
        return null
    }

    return (
        <>
            <div className='absolute left-0 top-0 bottom-0'
                style={{
                    borderLeft: isDropLeft ? '4px solid var(--dropTargetTip)' : 'transparent',
                }}>
            </div>
            <div className='absolute right-0 top-0 bottom-0'
                style={{
                    borderRight: isDropLeft ? 'transparent' : '4px solid var(--dropTargetTip)',
                }}>
            </div>
        </>
    )
}