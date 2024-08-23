import React from 'react';
import { TimeTravel_UI } from '@/engine/TimeTravel/UI';
import { cn } from '@/lib/utils';
import { HeaderRightBtns } from '@/engine/Connector/index.UI';

export function MPG_Header() {
    return (
        <div id='header'
            className={cn(`h-[60px] grow-0 shrink-0 flex justify-around bg-secondary relative z-20`)}>
            <div className='flex-grow-[2] basis-0 flex items-center'>

            </div>
            <div className='flex-grow-[3] basis-0 flex items-center justify-center'>
                <TimeTravel_UI />
            </div>
            <div className='flex-grow-[2] basis-0 flex items-center'>
                <HeaderRightBtns />
            </div>
        </div>
    )
}