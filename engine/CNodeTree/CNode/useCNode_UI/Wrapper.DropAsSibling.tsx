import React from 'react';
import type { T_CNode } from '../index.type';

interface I_WrapperDropAsSibling extends React.InputHTMLAttributes<HTMLDivElement> {
    isDropTarget: T_CNode['isDropTarget'];
    canDrop: boolean;
    isDropLeft: boolean;
};

export function WrapperDropAsSibling({ isDropTarget, canDrop, isDropLeft, className }: I_WrapperDropAsSibling) {
    if (!isDropTarget) {
        return null
    }

    const borderColor = canDrop ? 'var(--dropTargetTip)' : 'var(--dropTargetTip-ban)';

    return (
        <>
            {
                isDropLeft ?
                    <div className='absolute left-0 top-0 bottom-0 border-l-[4px] border-solid'
                        style={{
                            borderLeftColor: borderColor,
                        }}>
                    </div>
                    :
                    <div className='absolute right-0 top-0 bottom-0 border-r-[4px] border-solid'
                        style={{
                            borderRightColor: borderColor,
                        }}>
                    </div>
            }
        </>
    )
}