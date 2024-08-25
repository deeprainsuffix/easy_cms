// 可以改成使用库 todo
export type T_cNode_hashSource = (string | number | symbol | null | undefined)[];
export function deepClone_forHash(source: any, cNode_hashSource: T_cNode_hashSource) {
  const cache = new Map<any, any>();

  function c(obj: any) {
    let result: typeof obj = null;
    if (Array.isArray(obj)) {
      if (cache.has(obj)) {
        return obj
      }

      result = [];
      cache.set(obj, result);
      obj.forEach((v, i) => {
        result[i] = c(v);
      });
    } else if (typeof obj === 'object' && obj !== null) {
      if (cache.has(obj)) {
        return obj
      }

      result = {};
      cache.set(obj, result);
      Object.getOwnPropertyNames(obj).forEach(key => {
        result[key] = c(obj[key]);
      });
      Object.getOwnPropertySymbols(obj).forEach(sym => {
        let description = Symbol.keyFor(sym);
        if (description !== undefined) {
          result[Symbol.for(description)] = c(obj[sym]);
        } else {
          description = sym.description;
          result[Symbol(description)] = c(obj[sym]);
        }
      });
    } else if (typeof obj === 'symbol') {
      let description = Symbol.keyFor(obj);
      if (description !== undefined) {
        result = Symbol.for(description);
      } else {
        result = Symbol(description);
      }

      cNode_hashSource.push(result);
    } else if (typeof obj === 'function') {
      // 后续可能会加
      result = obj;
    } else {
      // 用不到Bigint
      result = obj;

      cNode_hashSource.push(result);
    }

    return result
  }

  return c(source)
}

export async function digest_cNode_hashSource(input: T_cNode_hashSource) {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/digest#%E5%B0%86%E6%91%98%E8%A6%81%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6%E5%AD%97%E7%AC%A6%E4%B8%B2
  try {
    // todo 应与一个用户参数耦合
    const nowTime = +Date.now();
    let str = input.join('') + nowTime;
    const msgUint8 = new TextEncoder().encode(str); // 编码为（utf-8）Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // 计算消息的哈希值
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // 将缓冲区转换为字节数组
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // 将字节数组转换为十六进制字符串
    return hashHex;
  } catch (err) {
    throw 'digestMessage出错 ->' + err;
  }
}
