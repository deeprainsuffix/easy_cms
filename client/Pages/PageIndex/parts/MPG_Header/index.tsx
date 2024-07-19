import React from 'react';
import { TimeTravel_UI } from '@/engine/TimeTravel/UI';
import { cn } from '@/lib/utils';

export default function MPG_Header() {
    return (
        <div id='mpg-header'
            className={cn('mpg-h-12 mpg-grow-0 mpg-shrink-0 mpg-bg-orange-500 mpg-flex  mpg-justify-around')}>
            我是头部
            <TimeTravel_UI />
        </div>
    )
}