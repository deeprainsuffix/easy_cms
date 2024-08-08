import React from 'react';
import MPG_Header from './parts/MPG_Header';
import MPG_Left from './parts/MPG_Left';
import MPG_Center from './parts/MPG_Center';
import MPG_Right from './parts/MPG_Right';
import { CNodeSticker_UI } from '@/engine/Operator/CNodeSticker/UI';
import { cn } from '@/lib/utils';

export default function PageIndex() {
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