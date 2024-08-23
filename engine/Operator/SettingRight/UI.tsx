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
        return (
            <div className='w-[150px] mx-auto mt-[60px] text-center text-secondary-foreground'>
                请在画布中选中组件
            </div>
        )
    }

    return (
        <div id='settingRight'>
            <Tabs
                defaultValue='SettingProps'
            >
                <TabsList
                    className='w-full shadow-[0px_5px_2px_#94a3b8]'
                >
                    <TabsTrigger className='flex-grow' value="SettingProps">属性</TabsTrigger>
                    <TabsTrigger className='flex-grow' value="SettingCssStyle">样式</TabsTrigger>
                </TabsList>
                <div className='p-3'>
                    <TabsContent value="SettingProps"><SettingProps_UI /></TabsContent>
                    <TabsContent value="SettingCssStyle"><SettingCssStyle_UI /></TabsContent>
                </div>
            </Tabs>
        </div>
    )
}