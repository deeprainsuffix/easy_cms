import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 可以改成使用库 todo
export function deepClone(source: any) {
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
    } else if (typeof obj === 'function') {
      // 后续可能会加
      result = obj;
    } else {
      // 用不到Bigint
      result = obj;
    }

    return result
  }

  return c(source)
}