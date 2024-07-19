import React, { useState, useEffect, useCallback, } from 'react';
import { timeTravel } from '.';
import { actionController } from '../ActionController';
import { Button } from '@/components/ui/button';

export function TimeTravel_UI() {
    const [_, setState] = useState(0);
    useEffect(() => {
        timeTravel.render = () => setState(_ => _ + 1);
    }, []);

    const onUndo = useCallback(() => {
        actionController.dispatchUndo();
    }, []);

    const onRedo = useCallback(() => {
        actionController.dispatchRedo();
    }, []);

    const { canUndo, canRedo } = timeTravel;

    return (
        <div className='mpg-flex mpg-items-center'>
            <Button onClick={onUndo} disabled={!canUndo} className='mpg-mr-8 mpg-border-4 mpg-border-solid mpg-border-sky-500'>撤销</Button>
            <Button onClick={onRedo} disabled={!canRedo} className='mpg-mr-8 mpg-border-4 mpg-border-solid mpg-border-sky-500'>重做</Button>
        </div>
    )
}