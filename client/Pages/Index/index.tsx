import React, { useEffect } from 'react';
import MPG_Header from './parts/MPG_Header';
import MPG_Left from './parts/MPG_Left';
import MPG_Center from './parts/MPG_Center';
import MPG_Right from './parts/MPG_Right';
import { CNodeSticker_UI } from '@/engine/Operator/CNodeSticker/UI';
import { cn } from '@/lib/utils';
import { actionController } from '@/engine/ActionController';
import { ActionTip_type_select_update } from '@/engine/ActionController/ActionTip';

export default function PageIndex() {
    const handleResize = () => {
        actionController.dispatchAction({
            type: ActionTip_type_select_update,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div
            id='mpg-page-index'
            className={cn('mpg-h-full mpg-flex mpg-flex-col')}
        >
            <MPG_Header />
            <div
                id='mpg-body'
                className={cn('mpg-flex')}
                style={{
                    height: 'calc(100% - 60px)',
                }}
            >
                <MPG_Left />
                <MPG_Center />
                <MPG_Right />
            </div>
            <CNodeSticker_UI />
        </div>
    )
}