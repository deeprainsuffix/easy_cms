import React, { useContext } from 'react';
import TreePlanting from '../../Components/TreePlanting/TreePlanting';
import { Ctx } from '../../Ctx/ctx';

export default function MPG_Center() {
    const ctx = useContext(Ctx);
    return (
        <div id='mpg-center'>
            <TreePlanting cNode={ctx.cNodeRoot} />
        </div>
    )
}