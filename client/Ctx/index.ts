import { createContext } from 'react';
import type { Root_CNode } from '@/engine/CNodeTree/CNode/Foundation/Root_CNode';

interface I_Ctx {
    cNodeRoot: Root_CNode; // todo 改成根类
}

export const Ctx = createContext<I_Ctx>({
    cNodeRoot: {} as Root_CNode,
});