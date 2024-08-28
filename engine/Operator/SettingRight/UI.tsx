import React, { useCallback, useEffect, useState } from 'react';
import { settingRight, tab_SettingProps, tab_SettingCssStyle, type I_SettingRight } from '.';
import { SettingProps_UI } from '../SettingProps/UI';
import { SettingCssStyle_UI } from '../SettingCssStyle/UI';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingRight_UI() {
    const [_, setState] = useState(0);
    useEffect(() => {
        settingRight.render = () => setState(_ => _ + 1);
    }, []);

    const { selectedCNode, tab } = settingRight;
    const onChangeTab = useCallback((tab: I_SettingRight['tab']) => () => {
        settingRight.changeTab(tab);
    }, []);

    if (!selectedCNode) {
        return (
            <div className='w-[150px] mx-auto mt-[60px] text-center text-secondary-foreground'>
                请在画布中选中组件
            </div>
        )
    }

    return (
        <div id='settingRight' className='h-full'>
            <Tabs
                value={tab}
                className='h-full flex flex-col'
            >
                <TabsList
                    className='w-full shadow-[0px_5px_2px_#94a3b8] flex-grow-0 flex-shrink-0'
                >
                    <TabsTrigger className='flex-grow' value={tab_SettingProps} onClick={onChangeTab(tab_SettingProps)}>属性</TabsTrigger>
                    <TabsTrigger className='flex-grow' value={tab_SettingCssStyle} onClick={onChangeTab(tab_SettingCssStyle)}>样式</TabsTrigger>
                </TabsList>
                <div className='p-3 flex-1 h-0'>
                    <TabsContent value={tab_SettingProps}><SettingProps_UI /></TabsContent>
                    <TabsContent value={tab_SettingCssStyle}><SettingCssStyle_UI /></TabsContent>
                </div>
            </Tabs>
        </div>
    )
}