import React from 'react';
import MPG_Header from '../../Parts/MPG_Header';
import MPG_Left from '../../Parts/MPG_Left';
import MPG_Center from '../../Parts/MPG_Center';
import MPG_Right from '../../Parts/MPG_Right';
import { CNodeSticker_UI } from '@/engine/Operator/CNodeSticker/UI';

export default function PageIndex() {
    return (
        <div id='mpg-page-index'>
            <MPG_Header />
            <div id='mpg-body'>
                <MPG_Left />
                <MPG_Center />
                <MPG_Right />
            </div>
            <CNodeSticker_UI />
        </div>
    )
}