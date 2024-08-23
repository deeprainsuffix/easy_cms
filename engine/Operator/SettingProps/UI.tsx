import React, { useEffect, useState } from 'react';
import { settingProps } from '.';

export function SettingProps_UI() {
    const [_, setState] = useState(0);
    useEffect(() => {
        settingProps.render = () => setState(_ => _ + 1);
    }, []);

    const { selectedCNode } = settingProps;
    if (!selectedCNode) {
        return null
    }

    const CNode_UI_Props = selectedCNode.CNode_UI_Props;

    return (
        <div id='settingProps'>
            {/** @ts-ignore 程序保证CNode对应 */}
            <CNode_UI_Props key={selectedCNode.id} cNode={selectedCNode} />
        </div>
    )
}