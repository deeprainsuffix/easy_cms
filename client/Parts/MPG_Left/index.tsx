import React from 'react';
import "./index.less"
import cNode_activeBefore_collection from '../../../engine/NodeTree/CNode/cNode_activeBefore_collection'

export default function MPG_Left() {
    return (
        <div id='mpg-left'>
            我是左边
            <Simple />
        </div>
    )
}

function Simple() {
    console.log(cNode_activeBefore_collection);
    return (
        <div></div>
    )
}