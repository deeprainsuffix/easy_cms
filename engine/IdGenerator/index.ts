// 简单点写就行
class IdGenerator {
    private id: number;

    constructor() {
        this.id = 0;
    }

    public get() {
        return this.id
    }

    public gene() {
        ++this.id;
        return this.id
    }

    public update(id: number) {
        if (id < this.id) {
            throw 'id过小，已经被使用'
        }

        this.id = id;
    }
}

export const idGenerator = new IdGenerator();