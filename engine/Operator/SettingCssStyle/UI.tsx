import React, { useEffect, useState } from 'react';
import { settingCssStyle } from '.';

export function SettingCssStyle_UI() {
    const [_, setState] = useState(0);
    useEffect(() => {
        settingCssStyle.render = () => setState(_ => _ + 1);
    }, []);

    const { selectedCNode } = settingCssStyle;

    return (
        <div id='mpg-settingCssStyle'>样式设置器</div>
    )
}