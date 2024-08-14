import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { page_Preview } from '@/client/Pages/page_urls';
import { connector } from '@/engine/Connector';
import { toast_dom } from '@/lib/utils';

export function Preview() {
    const [disabled, setDisabled] = useState(false);

    const handlePreview = useCallback(async () => {
        setDisabled(true);
        let success = await connector.preview();
        setDisabled(false);
        if (!success) {
            toast_dom('预览失败');
            return
        }

        window.open(page_Preview);
    }, []);

    return (
        <Button disabled={disabled} onClick={handlePreview}>预览</Button>
    )
}