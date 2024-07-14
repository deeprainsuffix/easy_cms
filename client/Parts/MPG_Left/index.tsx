import React from 'react';
import cNode_activeBefore_collection from '../../../engine/CNodeTree/CNode/cNode_activeBefore_collection'

export default function MPG_Left() {
    return (
        <div id='mpg-left'>
            <Simple />
        </div>
    )
}

// todo
function Simple() {
    console.log('cNode_activeBefore_collection', cNode_activeBefore_collection);
    return (
        <div>
            <br /><br />
            {
                Object.entries(cNode_activeBefore_collection).map(([category, activeBefore]) => {
                    return (
                        <div key={category}>
                            <div>{category}</div>
                            {
                                activeBefore.map(({ componentName, ReactComponentFuncActiveBefore }) => {
                                    return (
                                        <div key={componentName} className='mpg-border-4 mpg-border-solid mpg-border-orange-500 mpg-pl-8 mpg-mx-8'>
                                            <ReactComponentFuncActiveBefore />
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