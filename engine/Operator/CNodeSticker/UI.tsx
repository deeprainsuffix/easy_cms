import React, { useCallback, useEffect, useState } from 'react';
import { cNodeSticker } from '.';
import { actionController } from '@/engine/ActionController';
import { ActionCNode_type_copy, ActionCNode_type_delete } from '@/engine/ActionController/ActionCNode';
import { ActionTip_type_select } from '@/engine/ActionController/ActionTip';

interface I_CNodeSticker_UI extends React.HTMLAttributes<HTMLDivElement> {

}

export function CNodeSticker_UI(props: I_CNodeSticker_UI) {
    const [_, setState] = useState(0);
    useEffect(() => {
        cNodeSticker.render = () => setState(_ => _ + 1);
    }, []);

    const { selectedCNode, domRect } = cNodeSticker;

    const onUpLevel = useCallback(() => {
        if (!selectedCNode) {
            return
        }

        actionController.dispatchAction({
            type: ActionTip_type_select,
            id: selectedCNode.parent!.id,
        });
    }, [selectedCNode]);

    const onCopy = useCallback(() => {
        if (!selectedCNode) {
            return
        }

        actionController.dispatchAction({
            type: ActionCNode_type_copy,
            copyId: selectedCNode.id,
            parentId: selectedCNode.parent!.id,
            pos: selectedCNode.pos + 1,
        });
    }, [selectedCNode]);

    const onDelete = useCallback(() => {
        if (!selectedCNode) {
            return
        }

        actionController.dispatchAction({
            type: ActionCNode_type_delete,
            id: selectedCNode.id,
            prevParentId: selectedCNode.parent!.id,
            pos: selectedCNode.pos,
        });
    }, [selectedCNode]);

    if (!selectedCNode) {
        return null
    }

    const { left, right, top, bottom } = domRect!; // todo

    return (
        (
            <div id='mpg-cNodeSticker'
                className='mpg-absolute'
                style={{ left, top }}
            >
                <div
                    className='mpg-border-4 mpg-border-solid mpg-border-sky-500'
                    style={{ width: right - left, height: bottom - top }}
                >
                </div>
                <div
                    className='mpg-flex mpg-absolute mpg-right-0'
                >
                    <div className='mpg-w-12' onClick={onUpLevel}>向上</div>
                    <div className='mpg-w-12' onClick={onCopy}>复制</div>
                    <div className='mpg-w-12' onClick={onDelete}>删除</div>
                </div>
            </div>
        )
    )
}