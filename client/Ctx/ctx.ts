import { createContext } from 'react';
import { CNode } from '../../engine/CNodeTree/CNode';

interface I_Ctx {
    cNodeRoot: CNode; // todo 改成根类
}

export const Ctx = createContext<I_Ctx>({
    cNodeRoot: {} as CNode,
});