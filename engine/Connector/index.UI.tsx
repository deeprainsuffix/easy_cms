import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { page_Preview } from '@/client/Pages/page_urls';
import { connector } from '@/engine/Connector';
import { toast_dom } from '@/lib/utils';
import { Btn_codeGen } from './Btn_codeGen.UI';

export function HeaderRightBtns() {
    const [ban_preview, set_ban_preview] = useState(false);
    const handle_preview = useCallback(async () => {
        set_ban_preview(true);
        let success = await connector.preview();
        set_ban_preview(false);
        if (!success) {
            toast_dom('预览失败');
            return
        }

        window.open(page_Preview);
    }, []);

    return (
        <div className='mpg-flex mpg-items-center'>
            <Button disabled={ban_preview} onClick={handle_preview}>预览</Button>
            <Btn_codeGen />
        </div>
    )
}




