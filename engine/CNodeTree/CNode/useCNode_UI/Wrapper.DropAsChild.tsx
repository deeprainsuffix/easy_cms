import React from 'react';
import type { T_CNode_Concrete } from '../index.type';

interface I_WrapperDropAsChild extends React.InputHTMLAttributes<HTMLDivElement> {
    isDropTarget: T_CNode_Concrete['isDropTarget'];
};

export function WrapperDropAsChild({ isDropTarget, className }: I_WrapperDropAsChild) {
    if (!isDropTarget) {
        return null
    }

    return (
        <>
            <div className='absolute top-0 left-0 right-0 border-t-[4px] border-solid border-dropTargetTip'></div>
            <div className='absolute bottom-0 left-0 right-0 border-b-[4px] border-solid border-dropTargetTip'></div>
            <div className='absolute left-0 top-0 bottom-0 border-l-[4px] border-solid border-dropTargetTip'></div>
            <div className='absolute right-0 top-0 bottom-0 border-r-[4px] border-solid border-dropTargetTip'></div>
        </>
    )
}