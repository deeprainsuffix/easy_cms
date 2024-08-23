import React, { useContext } from 'react';
import { TreePlanting } from '@/client/Components/TreePlanting';
import { Ctx } from '@/client/Ctx';
import { cn } from '@/lib/utils';

export function MPG_Center() {
    const ctx = useContext(Ctx);
    return (
        <div
            id='mpg-center'
            className={cn(
                'mpg-grow mpg-shrink mpg-p-[8px] mpg-bg-s200 mpg-relative mpg-z-0'
            )}
            style={{
                maxWidth: 'calc(100% - 300px - 300px)',
            }}
        >
            <TreePlanting cNode={ctx.cNodeRoot} />
        </div>
    )
}