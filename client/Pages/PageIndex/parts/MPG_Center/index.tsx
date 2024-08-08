import React, { useContext } from 'react';
import TreePlanting from '@/client/Components/TreePlanting';
import { Ctx } from '@/client/Ctx';
import { cn } from '@/lib/utils';

export default function MPG_Center() {
    const ctx = useContext(Ctx);
    return (
        <div
            id='mpg-center'
            className={cn(
                'mpg-grow mpg-shrink mpg-p-[8px] mpg-bg-card mpg-bg-workground'
            )}
            style={{
                maxWidth: 'calc(100% - 300px - 300px)',
            }}
        >
            <TreePlanting cNode={ctx.cNodeRoot} />
        </div>
    )
}