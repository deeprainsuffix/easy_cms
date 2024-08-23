import React from 'react';
import { CNode_UI_Left_collection } from '@/engine/CNodeTree/CNode/CNode_UI_Left_collection'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CNode_UI_Left_Drag } from '@/engine/CNodeTree/CNode/Wrapper_CNode_UI_Left/CNode_UI_Left_Drag';
import { CNode_UI_Left_Icon_collection } from '@/engine/CNodeTree/CNode/CNode_UI_Left_Icon_collection';

export function CNodeDragLeft() {
    return (
        <div>
            <Accordion type="multiple">
                {
                    CNode_UI_Left_collection.map(({ componentCategory, title: category_title, components }) => {
                        return (
                            <AccordionItem key={componentCategory} value={componentCategory}>
                                <AccordionTrigger className='pt-2.5 hover:no-underline'>{category_title}</AccordionTrigger>
                                {
                                    components.map(({ componentName, title: component_title }) => {
                                        const Icon_Left = CNode_UI_Left_Icon_collection[componentName];
                                        return (
                                            <CNode_UI_Left_Drag key={componentName} componentName={componentName}>
                                                <AccordionContent className='h-10 px-2 flex items-center rounded-md hover:bg-s200 cursor-grab'>
                                                    <Icon_Left />
                                                    <span>{component_title}</span>
                                                </AccordionContent>
                                            </CNode_UI_Left_Drag>
                                        )
                                    })
                                }
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </div>
    )
}