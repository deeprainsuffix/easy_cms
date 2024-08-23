import React, { useContext } from 'react';
import { TreePlanting } from '@/client/Components/TreePlanting';
import { Ctx } from '@/client/Ctx';
import { cn } from '@/lib/utils';

export function MPG_Center() {
    const ctx = useContext(Ctx);
    return (
        <div
            id='center'
            className={cn(
                'grow shrink p-[8px] bg-s200 relative z-0'
            )}
            style={{
                maxWidth: 'calc(100% - 300px - 300px)',
            }}
        >
            <TreePlanting cNode={ctx.cNodeRoot} />
        </div>
    )
}