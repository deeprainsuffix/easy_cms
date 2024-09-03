import React from 'react';
import { CodeGen_UI } from './codeGen.UI';

export function HeaderRightBtns() {
    return (
        <div className='flex items-center'>
            {/* <Button disabled={ban_preview} onClick={handle_preview}>预览</Button> */}
            <CodeGen_UI />
        </div>
    )
}




