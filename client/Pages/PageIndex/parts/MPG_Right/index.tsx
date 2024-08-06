import React from 'react';
import { cn } from '@/lib/utils';
import { SettingRight_UI } from '@/engine/Operator/SettingRight/UI';

export default function MPG_Right() {
    return (
        <div
            id='mpg-right'
            className={cn('mpg-basis-[300px] mpg-min-w-[300px] mpg-grow-0 mpg-shrink-0 mpg-bg-rose-700')}
        >
            <SettingRight_UI />
        </div>
    )
}