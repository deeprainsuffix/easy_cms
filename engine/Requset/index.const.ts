export const UNDO = 'UNDO',
    DOING = 'DOING',
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL';
export type T_state = typeof UNDO | typeof DOING | typeof SUCCESS | typeof FAIL;