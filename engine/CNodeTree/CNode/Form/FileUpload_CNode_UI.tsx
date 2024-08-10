import React from 'react';
import type { FileUpload_CNode } from './FileUpload_CNode';
import { CNode_UI_Drag } from '../Wrapper_CNode_UI/CNode_UI_Drag';
import { CNode_UI_DropAsSibling } from '../Wrapper_CNode_UI/CNode_UI_DropAsSibling';
import { CNode_UI_Mouse } from '../Wrapper_CNode_UI/CNode_UI_Mouse';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";

interface I_FileUpload_CNode_UI {
    cNode: FileUpload_CNode;
}

export function FileUpload_CNode_UI({ cNode }: I_FileUpload_CNode_UI) {
    const props = cNode.props;
    const { fieldLabel, fieldPlaceholder } = props;

    return (
        <div id={cNode.id} ref={cNode.ref} className='mpg-max-w-[302px] mpg-bg-s200'>
            <CNode_UI_Mouse cNode={cNode} enablePrevent>
                <CNode_UI_DropAsSibling cNode={cNode}>
                    <CNode_UI_Drag cNode={cNode}>
                        <div className={`mpg-flex mpg-items-center
                        mpg-h-[50px] mpg-p-[4px]
                        mpg-border-[2px] mpg-border-solid mpg-border-s400 mpg-rounded-md`}>
                            <div className='mpg-flex-grow-0 mpg-flex-shrink-1 mpg-basis-[100px] mpg-flex mpg-justify-center mpg-items-center mpg-break-all'>{fieldLabel}</div>
                            <div className='mpg-flex-grow-0 mpg-flex-shrink-1 mpg-basis-[200px]'>
                                <Label htmlFor={`upload-${cNode.id}`}
                                    className='mpg-self-stretch mpg-flex mpg-items-center'
                                >{fieldPlaceholder}</Label>
                                <Input id={`upload-${cNode.id}`} type="file" style={{ display: 'none' }} />
                            </div>
                        </div>
                    </CNode_UI_Drag>
                </CNode_UI_DropAsSibling>
            </CNode_UI_Mouse>
        </div>
    )
}