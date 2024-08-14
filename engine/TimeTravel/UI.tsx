import React, { useState, useEffect, useCallback, } from 'react';
import { timeTravel } from '.';
import { actionController } from '../ActionController';
import { ActionTip_type_select_none } from '../ActionController/ActionTip';
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
                <svg className="icon_TimeTravel_UI" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1783" width="32" height="32"><path d="M452.266667 413.866667V305.066667a25.173333 25.173333 0 0 0-40.106667-20.906667L145.066667 469.333333a25.6 25.6 0 0 0 0 42.666667l267.093333 186.453333a25.6 25.6 0 0 0 40.106667-21.333333V610.133333a25.6 25.6 0 0 1 26.88-25.6 341.333333 341.333333 0 0 1 301.653333 263.68 336.64 336.64 0 0 0-304.213333-409.173333 25.173333 25.173333 0 0 1-24.32-25.173333z" fill="currentColor" p-id="1784"></path></svg>
            </Button>
            <Button onClick={canRedo ? onRedo : undefined} variant={'TimeTravel'} size={'TimeTravel'}
                style={canRedo ? { cursor: 'pointer' } : { cursor: 'not-allowed', opacity: '0.5' }}
            >
                <svg className="icon_TimeTravel_UI" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2057" width="32" height="32"><path d="M512 371.2V261.973333a25.6 25.6 0 0 1 40.106667-20.906666L819.2 426.666667a25.6 25.6 0 0 1 0 42.666666l-267.093333 186.453334a25.6 25.6 0 0 1-40.106667-20.906667V567.466667a25.173333 25.173333 0 0 0-26.88-25.6 341.333333 341.333333 0 0 0-301.653333 263.68 336.64 336.64 0 0 1 304.64-409.173334 25.173333 25.173333 0 0 0 23.893333-25.173333z" fill="currentColor" p-id="2058"></path></svg>
            </Button>
        </div>
    )
}