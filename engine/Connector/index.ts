import { landingCode_gen_req } from '../Requset';
interface I_Connector {

}

// 不需要render，由UI自己控制
class Connector implements I_Connector {
    constructor() {

    }

    public async codeGen(params: Parameters<typeof landingCode_gen_req>[0]): Promise<ReturnType<typeof landingCode_gen_req>> {
        return await landingCode_gen_req(params);
    }
}

export const connector = new Connector();