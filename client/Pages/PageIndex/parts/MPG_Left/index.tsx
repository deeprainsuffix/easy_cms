import React from 'react';
import CNode_UI_Left_collection from '@/engine/CNodeTree/CNode/CNode_UI_Left_collection'
import { cn } from '@/lib/utils';

export default function MPG_Left() {
    return (
        <div
            id='mpg-left'
            className={cn('mpg-basis-72 mpg-grow-0 mpg-shrink-0 mpg-bg-zinc-200')}
        >
            <Simple />
        </div>
    )
}

// todo
function Simple() {
    console.log('CNode_UI_Left_collection', CNode_UI_Left_collection);
    return (
        <div>
            <br /><br />
            {
                Object.entries(CNode_UI_Left_collection).map(([category, CNode_UI_Lefts]) => {
                    return (
                        <div key={category}>
                            <div>{category}</div>
                            {
                                CNode_UI_Lefts.map(({ componentName, CNode_UI_Left }) => {
                                    return (
                                        <div key={componentName} className='mpg-border-4 mpg-border-solid mpg-border-orange-500 mpg-pl-8 mpg-mx-8'>
                                            <CNode_UI_Left />
                                        </div>
                                    )
                                })
                            }
                            <br />
                        </div>

                    )
                })
            }
        </div>
    )
}