import React, { useEffect, useState } from 'react';
import { settingRight } from '.';
import { SettingProps_UI } from '../SettingProps/UI';
import { SettingCssStyle_UI } from '../SettingCssStyle/UI';

export function SettingRight_UI() {
    const [_, setState] = useState(0);
    useEffect(() => {
        settingRight.render = () => setState(_ => _ + 1);
    }, []);

    const { selectedCNode } = settingRight;

    return (
        <div
            id='mpg-settingRight'
        >
            <SettingProps_UI />
            <SettingCssStyle_UI />
        </div>
    )
}