import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CNodeDragLeft } from '@/client/Components/CNodeDragLeft';
const Todo = () => (
    <div>
        todo
    </div>
);

const panel_CNodeDragLeft = 'CNodeDragLeft';
const panel_CNodeTreeLeft = 'CNodeTreeLeft';
type T_panel =
    typeof panel_CNodeDragLeft |
    typeof panel_CNodeTreeLeft
    ;
const panel_collection = [
    {
        type: panel_CNodeDragLeft,
        Icon: () => (<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4274" width="32" height="32"><path d="M768 928H128a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32h195.84A132.48 132.48 0 0 1 320 192a128 128 0 0 1 256 0 132.48 132.48 0 0 1-3.84 32H768a32 32 0 0 1 32 32v195.84A132.48 132.48 0 0 1 832 448a128 128 0 0 1 0 256 132.48 132.48 0 0 1-32-3.84V896a32 32 0 0 1-32 32z m-608-64h576v-216.96a32.64 32.64 0 0 1 19.2-29.44 32.64 32.64 0 0 1 33.92 5.76 64 64 0 1 0 0-94.72 31.36 31.36 0 0 1-33.92 5.76 32.64 32.64 0 0 1-19.2-29.44V288H519.04a32.64 32.64 0 0 1-29.44-19.2 31.36 31.36 0 0 1 5.76-33.92 64 64 0 1 0-94.72 0 31.36 31.36 0 0 1 5.76 33.92 32.64 32.64 0 0 1-29.44 19.2H160z" fill="currentColor" p-id="4275"></path></svg>),
        Panel: CNodeDragLeft,
        description: '组件库',
    },
    {
        type: panel_CNodeTreeLeft,
        Icon: () => (<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5550" width="32" height="32"><path d="M576 682.666667H640v128h-213.333333v-128h64v-128H298.666667v128h42.666666v128H170.666667v-128h42.666666v-213.333334h277.333334V341.333333H426.666667V213.333333h213.333333v128h-64v128H853.333333v213.333334h42.666667v128h-170.666667v-128h42.666667v-128h-192v128z" fill="currentColor" p-id="5551"></path></svg>),
        Panel: Todo,
        description: '组件树',
    },
] as const;

export function MPG_Left() {
    const [panel, setPanel] = useState<T_panel>('CNodeDragLeft');
    const choosePanel = (panel: T_panel) => () => {
        setPanel(panel);
    }

    return (
        <div
            id='left'
            className={cn(`basis-[300px] min-w-[300px] grow-0 shrink-0
                bg-secondary border-[1px] border-solid
                flex`)}
        >

            <div className={`basis-[50px] grow-0 shrink-0 border-r-[1px] border-solid border-border
                flex flex-col`}>
                <TooltipProvider>
                    {
                        panel_collection.map(({ type, Icon, Panel, description }) => {
                            return (
                                <Tooltip key={type}>
                                    <TooltipTrigger onClick={choosePanel(type)} className='basis-[50px] p-[5px]'>
                                        <div className='w-full h-full flex justify-center items-center rounded-md'
                                            style={{ backgroundColor: panel === type ? 'var(--s300)' : 'transparent' }}>
                                            <Icon />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side='right'>
                                        <p>{description}</p>
                                    </TooltipContent>
                                </Tooltip>
                            )
                        })
                    }
                </TooltipProvider>
            </div>
            <div className='h-full flex-auto overflow-y-auto p-[10px] pt-0'>
                {
                    panel_collection.map(({ type, Panel }) => {
                        return (
                            panel === type && <Panel key={type} />
                        )
                    })
                }
            </div>
        </div>
    )
}