import React from 'react';
import { TimeTravel_UI } from '@/engine/TimeTravel/UI';
import { cn } from '@/lib/utils';
import { HeaderRightBtns } from '@/engine/Connector/index.UI';

export default function MPG_Header() {
    return (
        <div id='mpg-header'
            className={cn(`mpg-h-[60px] mpg-grow-0 mpg-shrink-0 mpg-flex mpg-justify-around mpg-bg-secondary mpg-relative mpg-z-20`)}>
            <div className='mpg-flex-grow-[2] mpg-basis-0 mpg-flex mpg-items-center'>

            </div>
            <div className='mpg-flex-grow-[3] mpg-basis-0 mpg-flex mpg-items-center mpg-justify-center'>
                <TimeTravel_UI />
            </div>
            <div className='mpg-flex-grow-[2] mpg-basis-0 mpg-flex mpg-items-center'>
                <HeaderRightBtns />
            </div>
        </div>
    )
}