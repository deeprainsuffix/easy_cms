import { cNodeTree_json_clearTimeMs } from "@/server/Response/http_const";

export function valid_fresh_cNodeTree_hash(cNodeTree_hash_Birth: number): boolean {
    if (+new Date() - cNodeTree_hash_Birth > cNodeTree_json_clearTimeMs) {
        return false
    }

    return true
}