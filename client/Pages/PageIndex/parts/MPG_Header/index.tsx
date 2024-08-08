import React from 'react';
import { TimeTravel_UI } from '@/engine/TimeTravel/UI';
import { cn } from '@/lib/utils';

export default function MPG_Header() {
    return (
        <div id='mpg-header'
            className={cn(`mpg-h-[60px] mpg-grow-0 mpg-shrink-0 mpg-flex mpg-justify-around`)}>
            <TimeTravel_UI />
        </div>
    )
}