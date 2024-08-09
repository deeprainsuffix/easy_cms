import React from 'react';
import { CNode_UI_Left_collection } from '@/engine/CNodeTree/CNode/CNode_UI_Left_collection'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function CNodeDragLeft() {
    console.log('CNode_UI_Left_collection', CNode_UI_Left_collection);

    return (
        <div>
            <Accordion type="multiple">
                {
                    CNode_UI_Left_collection.map(({ componentCategory, title: category_title, components }) => {
                        return (
                            <AccordionItem key={componentCategory} value={componentCategory}>
                                <AccordionTrigger className='mpg-pt-2.5 hover:mpg-no-underline'>{category_title}</AccordionTrigger>
                                {
                                    components.map(({ componentName, Icon_Left, title: component_title, CNode_UI_Left }) => {
                                        return (
                                            <AccordionContent key={componentName} className='mpg-h-10 mpg-px-2 mpg-flex mpg-items-center mpg-rounded-md hover:mpg-bg-s200 mpg-cursor-grab'>
                                                <Icon_Left />
                                                <CNode_UI_Left />
                                            </AccordionContent>
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