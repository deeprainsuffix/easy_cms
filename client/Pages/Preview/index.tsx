import { valid_fresh_cNodeTree_hash } from '@/engine/lib/validate';
import { cNodeTree_JSON_get_req } from '@/engine/Requset';
import { toast_dom } from '@/lib/utils';
import { cNodeTree_hash_Birth_param, cNodeTree_hash_param, cNodeTree_json_fileName_prefix } from '@/server/Response/http_const';
import React, { useEffect } from 'react';

export function PagePreview(props: any) {
    useEffect(() => {
        async function fetchData() {
            const cNodeTree_hash_Birth = localStorage.getItem(cNodeTree_hash_Birth_param);
            const cNodeTree_hash = localStorage.getItem(cNodeTree_hash_param);
            if (!(cNodeTree_hash_Birth && cNodeTree_hash)) {
                toast_dom('预览失败');
                return
            }

            if (!valid_fresh_cNodeTree_hash(+cNodeTree_hash_Birth)) {
                localStorage.removeItem(cNodeTree_hash_param);
                localStorage.removeItem(cNodeTree_hash_Birth_param);
                toast_dom('预览页面过期');
                return
            }

            const cNodeTree_JSON = await cNodeTree_JSON_get_req(cNodeTree_hash);
            if (!cNodeTree_JSON) {
                toast_dom('预览失败');
                return
            }

            console.log('拿到json:', cNodeTree_JSON);
        }
        fetchData();
    }, []);

    return (
        <div>
            这里是预览页面 todo
        </div>
    )
}