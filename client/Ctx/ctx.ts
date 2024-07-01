import { createContext } from 'react';
import { CNode } from '../../engine/CNodeTree/CNode';

interface I_Ctx {
    cNodeRoot: CNode;
}

export const Ctx = createContext<I_Ctx>({
    cNodeRoot: {} as CNode,
});