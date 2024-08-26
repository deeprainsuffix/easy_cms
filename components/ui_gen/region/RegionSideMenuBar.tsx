import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function RegionSideMenuBar() {
    return (
        <Demo />
    )
}

let id = 0;
const CNode_UI_Left_collection = [
    {
        id: ++id,
        text: 't1',
        children: [
            {
                id: ++id,
                text: 't1-1',
            },
            {
                id: ++id,
                text: 't1-2',
            },
            {
                id: ++id,
                text: 't1-3',
            },
        ],
    },
    {
        id: ++id,
        text: 't2',
        children: [
            {
                id: ++id,
                text: 't2-1',
            },
            {
                id: ++id,
                text: 't2-2',
            },
            {
                id: ++id,
                text: 't2-3',
            },
        ],
    },
];

function Demo() {
    return (
        <Accordion
            type="multiple"
            className='h-full w-[300px] basis-[300px] flex-shrink-0 border-r-[1px] border-solid border-s500 p-[10px]'
        >
            {
                CNode_UI_Left_collection.map(({ id, text, children }) => {
                    return (
                        <AccordionItem key={id} value={String(id)}>
                            <AccordionTrigger className='pt-2.5 hover:no-underline'>{text}</AccordionTrigger>
                            {
                                children.map(({ id, text }) => {
                                    return (
                                        <AccordionContent
                                            key={id}
                                            className='h-10 px-2 flex items-center rounded-md hover:bg-s200 cursor-grab'
                                        >
                                            <span>{text}</span>
                                        </AccordionContent>
                                    )
                                })
                            }
                        </AccordionItem>
                    )
                })
            }
        </Accordion>
    )
}