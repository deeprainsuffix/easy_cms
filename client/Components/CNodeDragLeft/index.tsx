import React from 'react';
import { CNode_UI_Left_collection } from '@/engine/CNodeTree/CNode/CNode_UI_Left_collection'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CNode_UI_Left_Drag } from '@/engine/CNodeTree/CNode/Wrapper_CNode_UI_Left/CNode_UI_Left_Drag';

export function CNodeDragLeft() {
    return (
        <div>
            <Accordion type="multiple">
                {
                    CNode_UI_Left_collection.map(({ componentCategory, title: category_title, components }) => {
                        return (
                            <AccordionItem key={componentCategory} value={componentCategory}>
                                <AccordionTrigger className='mpg-pt-2.5 hover:mpg-no-underline'>{category_title}</AccordionTrigger>
                                {
                                    components.map(({ componentName, Icon_Left, title: component_title }) => {
                                        return (
                                            <CNode_UI_Left_Drag key={componentName} componentName={componentName}>
                                                <AccordionContent className='mpg-h-10 mpg-px-2 mpg-flex mpg-items-center mpg-rounded-md hover:mpg-bg-s200 mpg-cursor-grab'>
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