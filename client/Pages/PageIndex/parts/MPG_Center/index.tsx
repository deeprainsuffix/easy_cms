import React, { useContext } from 'react';
import TreePlanting from '../../../../Components/TreePlanting/TreePlanting';
import { Ctx } from '../../../../Ctx/ctx';
import { cn } from '@/lib/utils';

export default function MPG_Center() {
    const ctx = useContext(Ctx);
    return (
        <div
            id='mpg-center'
            className={cn('mpg-grow mpg-shrink')}
        >
            <TreePlanting cNode={ctx.cNodeRoot} />
        </div>
    )
}