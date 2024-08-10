import React, { useCallback, useEffect, useState } from 'react';
import { cNodeSticker } from '.';
import { actionController } from '@/engine/ActionController';
import { ActionCNode_type_copy, ActionCNode_type_delete } from '@/engine/ActionController/ActionCNode';
import { ActionTip_type_select } from '@/engine/ActionController/ActionTip';
import { Button } from '@/components/ui/button';

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


    const { positionInfo } = cNodeSticker;
    const { box, edge_borderWidth, edge_left, edge_right, edge_top, edge_bottom, tool } = positionInfo;

    return (
        (
            <div id='mpg-cNodeSticker'
                className='mpg-absolute mpg-z-10'
                style={{ top: box.top, left: box.left }}
            >
                {/* 左右上下 */}
                <div
                    className='mpg-border-solid mpg-border-CNodeSticker-border mpg-absolute'
                    style={{ borderLeftWidth: edge_borderWidth, width: edge_left.width, height: edge_left.height, top: edge_left.top, left: edge_left.left }}
                >
                </div>
                <div
                    className='mpg-border-solid mpg-border-CNodeSticker-border mpg-absolute'
                    style={{ borderRightWidth: edge_borderWidth, width: edge_right.width, height: edge_right.height, top: edge_right.top, left: edge_right.left }}
                >
                </div>
                <div
                    className='mpg-border-solid mpg-border-CNodeSticker-border mpg-absolute'
                    style={{ borderTopWidth: edge_borderWidth, width: edge_top.width, height: edge_top.height, top: edge_top.top, left: edge_top.left }}
                >
                </div>
                <div
                    className='mpg-border-solid mpg-border-CNodeSticker-border mpg-absolute'
                    style={{ borderBottomWidth: edge_borderWidth, width: edge_bottom.width, height: edge_bottom.height, top: edge_bottom.top, left: edge_bottom.left }}
                >
                </div>
                {// todo 这里的id判断应该改成'1'
                    selectedCNode.id !== '4' && <div
                        className={`mpg-flex mpg-absolute mpg-bg-CNodeSticker-tool
                      mpg-h-[40px]  mpg-p-[4px]`}
                        style={{ top: tool.top, right: tool.right }}
                    >
                        <Button title='向上' onClick={onUpLevel} variant='CNodeSticker-tool' size='CNodeSticker-tool'>
                            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4246" width="24" height="24"><path d="M848.213333 416H576a21.333333 21.333333 0 0 0-21.333333 21.333333V981.333333a42.666667 42.666667 0 0 1-85.333334 0V437.333333a21.333333 21.333333 0 0 0-21.333333-21.333333H175.786667a21.333333 21.333333 0 0 1-15.786667-35.413333L495.786667 7.253333a21.333333 21.333333 0 0 1 31.573333 0l336.213333 373.333334a21.333333 21.333333 0 0 1-15.36 35.413333z" fill="currentColor" p-id="4247"></path></svg>
                        </Button>
                        <Button onClick={onCopy} variant='CNodeSticker-tool' size='CNodeSticker-tool'>
                            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5835" id="mx_n_1723105834229" width="24" height="24"><path d="M891.072 822.144V167.36a34.432 34.432 0 0 0-34.432-34.432H201.856C201.856 94.848 232.704 64 270.784 64h620.288C929.152 64 960 94.848 960 132.928v620.288c0 38.08-30.848 68.928-68.928 68.928z m-68.928-551.36v620.288c0 38.08-30.848 68.928-68.928 68.928H132.928A68.928 68.928 0 0 1 64 891.072V270.784c0-38.08 30.848-68.928 68.928-68.928h620.288c38.08 0 68.928 30.848 68.928 68.928z m-137.856 137.856H201.856a34.432 34.432 0 0 0 0 68.864h482.432a34.432 34.432 0 0 0 0-68.864z m0 206.72H201.856a34.432 34.432 0 0 0 0 68.864h482.432a34.432 34.432 0 0 0 0-68.864z" fill="currentColor" p-id="5836"></path></svg>
                        </Button>
                        <Button onClick={onDelete} variant='CNodeSticker-tool' size='CNodeSticker-tool'>
                            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6971" width="24" height="24"><path d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z" fill="currentColor" p-id="6972"></path><path d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z" fill="currentColor" p-id="6973"></path><path d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z" fill="currentColor" p-id="6974"></path><path d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z" fill="currentColor" p-id="6975"></path></svg>
                        </Button>
                    </div>
                }
            </div>
        )
    )
}