// todo 应该写一个服务端校验器
export function valid_cNodeTree_hash_format(cNodeTree_hash: string | null | undefined) {
    if (!cNodeTree_hash) {
        return false
    }

    const re = /[0-9a-z]{64}/;
    if (!re.test(cNodeTree_hash)) {
        return false
    }

    return true
}