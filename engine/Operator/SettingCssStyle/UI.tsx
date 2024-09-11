import React, { useCallback, useEffect, useState } from 'react';
import { settingCssStyle } from '.';
import { Button } from '@/components/ui/button';
import { FAIL, SUCCESS } from '@/engine/Requset/index.const';
import { Loading } from '@/components/ui_custom/Loading';

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

    const { contentFirstChange, state } = settingCssStyle;

    return (
        <div key={selectedCNode.id} id='settingCssStyle' className='h-full'>
            {state !== SUCCESS && <div className='flex justify-center p-2'>
                {
                    state === FAIL ?
                        '样式编辑器加载失败'
                        :
                        <div className='flex flex-col items-center'>
                            <div className='pb-2'>样式编辑器正在加载中</div>
                            <Loading />
                        </div>
                }
            </div>}
            <div id='cssEditor' className='h-3/5'></div>
            {state === SUCCESS && <div className='p-4 flex justify-between'>
                <Button onClick={onReset}>重置todo</Button>
                <Button disabled={!contentFirstChange} onClick={onSave}>保存</Button>
            </div>}
        </div>
    )
}