import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

let toastId = 0;
export function toast_dom(text: string, type?: 'error' | 'info') {
  toastId++;
  if (!type) {
    type = 'error';
  }

  const toast_height = 80;
  const show_duration = 3 * 1000;
  let move_duration = 0.1 * 1000, moveY = 30 + toast_height, moveY_v = moveY / move_duration,
    show_t_start = 0;
  let direction = 1;
  const show_frame = (t: number) => {
    if (show_t_start === 0) {
      show_t_start = t;
    }

    const pass = t - show_t_start;
    let distance = 0;
    if (direction === 1) {
      distance = Math.min(moveY_v * pass, moveY);
    } else {
      distance = Math.max(moveY - moveY_v * pass, 0);
    }
    toast.style.transform = `translateY(${distance}px)`;

    if (pass >= move_duration) {
      show_t_start = 0;
      if (direction === 1) {
        direction = 2;
        setTimeout(() => {
          window.requestAnimationFrame(show_frame);
        }, show_duration);
      } else {
        setTimeout(() => {
          document.body.removeChild(toast);
        }, move_duration);
      }
      return
    }

    window.requestAnimationFrame(show_frame);
  }

  type T_toast_style = Array<[keyof CSSStyleDeclaration, CSSStyleDeclaration[keyof CSSStyleDeclaration]]>;
  const style_toast: T_toast_style = [ // 类型推断用
    ['position', 'absolute'],
    ['zIndex', '999'],
    ['width', '300px'],
    ['height', `${toast_height}px`],
    ['top', `-${toast_height}px`],
    ['left', '0px'],
    ['right', '0px'],
    ['margin', '0px auto'],
    ['padding', '1rem'],
    ['borderRadius', 'calc(var(--radius) - 2px)'],
    ['wordBreak', 'break-all'],
    ['border', '1px solid transparent'],
  ] as const;

  switch (type) {
    case 'error':
      style_toast.push(
        ['backgroundColor', 'hsl(var(--destructive))'],
        ['color', 'hsl(var(--destructive-foreground))'],
        ['borderColor', 'hsl(var(--destructive))'],
      );
      break;
    case 'info':
      style_toast.push(
        ['backgroundColor', 'var(--toast_dom_info)'],
        ['color', 'var(--s900)'],
        ['borderColor', 'var(--toast_dom_info)'],
      );
      break;
  }

  const style_toast_content: T_toast_style = [
    ['height', '100%'],
    ['display', 'flex'],
    ['justifyContent', 'center'],
    ['alignItems', 'center'],
    ['overflowY', 'hidden'],
  ];

  const toast = document.createElement("div");
  toast.id = `toast_dom-${toastId}`;
  style_toast.forEach(([k, v]) => {
    //@ts-ignore
    toast.style[k] = v;
  });

  const toast_content = document.createElement("div");
  toast_content.textContent = text;
  style_toast_content.forEach(([k, v]) => {
    //@ts-ignore
    toast_content.style[k] = v;
  });

  toast.appendChild(toast_content);
  document.body.appendChild(toast);
  window.requestAnimationFrame(show_frame);
}