import { cNodeTree } from "../CNodeTree";
import { cNodeTree_JSON_save_req } from '../Requset';
import { cNodeTree_hash_Birth_param, cNodeTree_hash_param } from '@/server/Response/http_const';
import { valid_fresh_cNodeTree_hash } from '../lib/validate';

interface I_Connector {

}

class Connector implements I_Connector {
    constructor() {

    }

    public async preview(): Promise<boolean> {
        try {
            // 1、拿到cNodeTree_JSON和cNode_hash
            const { cNodeTree_JSON, cNodeTree_hash } = await cNodeTree.getCNodeTreeJSON();

            // 2、生成hash对比
            const cNodeTree_hash_prev = localStorage.getItem(cNodeTree_hash_param),
                cNodeTree_hash_Birth = localStorage.getItem(cNodeTree_hash_Birth_param);

            if (cNodeTree_hash_prev && cNodeTree_hash_Birth) {
                if (!valid_fresh_cNodeTree_hash(+cNodeTree_hash_Birth)) {
                    localStorage.removeItem(cNodeTree_hash_param);
                    localStorage.removeItem(cNodeTree_hash_Birth_param);
                } else {
                    if (cNodeTree_hash === cNodeTree_hash_prev) {
                        return true
                    }
                }
            }

            // 3、存储hash和json
            const birthtimeMs = await cNodeTree_JSON_save_req(cNodeTree_JSON, cNodeTree_hash);
            if (!birthtimeMs) {
                throw 'cNode_JSON_save_req失败';
            }

            localStorage.setItem(cNodeTree_hash_param, cNodeTree_hash);
            localStorage.setItem(cNodeTree_hash_Birth_param, birthtimeMs);

            return true
        } catch (err) {
            console.log('getCNodeTreeJSON出错 -> ' + err);
            return false
        }
    }
}

export const connector = new Connector();