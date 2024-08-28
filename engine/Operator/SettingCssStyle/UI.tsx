import React, { useCallback, useEffect, useState } from 'react';
import { settingCssStyle } from '.';
import { Button } from '@/components/ui/button';

export function SettingCssStyle_UI() {
    const [_, setState] = useState(0);
    useEffect(() => {
        settingCssStyle.render = () => setState(_ => _ + 1);
    }, []);

    const { selectedCNode } = settingCssStyle;

    useEffect(() => {
        if (!selectedCNode) {
            return
        }

        const dom = document.querySelector('#settingCssStyle > #cssEditor') as HTMLElement;
        settingCssStyle.cssEditor_create(dom);
    }, [selectedCNode && selectedCNode.id]);

    const onSave = useCallback(() => {
        settingCssStyle.css_save();
    }, []);

    const onReset = useCallback(() => {
        settingCssStyle.css_reset();
    }, []);

    if (!selectedCNode) {
        return null
    }

    const { contentFirstChange } = settingCssStyle;

    return (
        <div id='settingCssStyle' className='h-full'>
            <div id='cssEditor' className='h-3/5'></div>
            <div className='p-4 flex justify-between'>
                <Button onClick={onReset}>重置todo</Button>
                <Button disabled={!contentFirstChange} onClick={onSave}>保存</Button>
            </div>
        </div>
    )
}