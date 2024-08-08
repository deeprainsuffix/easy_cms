import React, { useState, useEffect, useCallback, } from 'react';
import { timeTravel } from '.';
import { actionController } from '../ActionController';
import { ActionTip_type_select_none } from '../ActionController/ActionTip';
import Icon_undo from '@/client/resource/undo.png';
import Icon_redo from '@/client/resource/redo.png';
import { Button } from '@/components/ui/button';

export function TimeTravel_UI() {
    const [_, setState] = useState(0);
    useEffect(() => {
        timeTravel.render = () => setState(_ => _ + 1);
    }, []);

    const onUndo = useCallback(() => {
        actionController.dispatchAction({
            type: ActionTip_type_select_none,
        });
        actionController.dispatchUndo();
    }, []);

    const onRedo = useCallback(() => {
        actionController.dispatchAction({
            type: ActionTip_type_select_none,
        });
        actionController.dispatchRedo();
    }, []);

    const { canUndo, canRedo } = timeTravel;

    return (
        <div className='mpg-flex mpg-items-center'>
            <Button onClick={canUndo ? onUndo : undefined} variant={'TimeTravel'} size={'TimeTravel'}
                style={canUndo ? { cursor: 'pointer' } : { cursor: 'not-allowed', opacity: '0.5' }}
            >
                <img src={Icon_undo} width={30} height={30} className='mpg-inline' alt="撤销" />
            </Button>
            <Button onClick={canRedo ? onRedo : undefined} variant={'TimeTravel'} size={'TimeTravel'}
                style={canRedo ? { cursor: 'pointer' } : { cursor: 'not-allowed', opacity: '0.5' }}
            >
                <img src={Icon_redo} width={30} height={30} className='mpg-inline' alt="重做" />
            </Button>
        </div>
    )
}