import React, { useEffect, useState } from 'react';
import { settingRight } from '.';
import { SettingProps_UI } from '../SettingProps/UI';
import { SettingCssStyle_UI } from '../SettingCssStyle/UI';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingRight_UI() {
    const [_, setState] = useState(0);
    useEffect(() => {
        settingRight.render = () => setState(_ => _ + 1);
    }, []);

    const { selectedCNode } = settingRight;

    if (!selectedCNode) {
        return <div>请在画布中选中组件</div>
    }

    const { CNode_UI_props } = selectedCNode;

    return (
        <div id='mpg-settingRight'>
            <Tabs defaultValue='SettingProps' className="">
                <TabsList>
                    {CNode_UI_props && <TabsTrigger value="SettingProps">属性</TabsTrigger>}
                    {/* <TabsTrigger value="SettingCssStyle">样式</TabsTrigger> */}
                </TabsList>
                {CNode_UI_props && <TabsContent value="SettingProps"><SettingProps_UI /></TabsContent>}
                {/* <TabsContent value="SettingCssStyle"><SettingCssStyle_UI /></TabsContent> */}
            </Tabs>
        </div>
    )
}