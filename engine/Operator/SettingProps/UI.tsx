import React, { useEffect, useState } from 'react';
import { settingProps } from '.';

export function SettingProps_UI() {
    const [_, setState] = useState(0);
    useEffect(() => {
        settingProps.render = () => setState(_ => _ + 1);
    }, []);

    const { selectedCNode } = settingProps;

    return (
        selectedCNode
            ?
            <div id='mpg-settingProps'>属性设置器</div>
            :
            null
    )
}