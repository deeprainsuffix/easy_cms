import React from 'react';
import { cn } from '@/lib/utils';
import { SettingRight_UI } from '@/engine/Operator/SettingRight/UI';

export function MPG_Right() {
    return (
        <div
            id='right'
            className={cn(`basis-[300px] min-w-[300px] grow-0 shrink-0
                bg-secondary border-[1px] border-solid`)}
        >
            <SettingRight_UI />
        </div>
    )
}