import React from 'react';
import { cn } from '@/lib/utils';
import { CNodeDragLeft } from '@/client/Components/CNodeDragLeft';

export default function MPG_Left() {
    return (
        <div
            id='mpg-left'
            className={cn(`mpg-basis-[300px] mpg-min-w-[300px] mpg-grow-0 mpg-shrink-0
                mpg-bg-secondary mpg-border-[1px] mpg-border-solid`)}
        >
            <CNodeDragLeft />
        </div>
    )
}