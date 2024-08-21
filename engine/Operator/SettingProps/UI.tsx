import React, { useEffect, useState } from 'react';
import { settingProps } from '.';

export function SettingProps_UI() {
    const [_, setState] = useState(0);
    useEffect(() => {
        settingProps.render = () => setState(_ => _ + 1);
    }, []);

    const { selectedCNode } = settingProps;
    const CNode_UI_props = selectedCNode!.CNode_UI_props;

    return (
        <div id='mpg-settingProps'>
            <CNode_UI_props key={selectedCNode!.id} cNode={selectedCNode} />
        </div>
    )
}