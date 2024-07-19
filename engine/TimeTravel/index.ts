interface I_TimeTravel {
    canUndo: boolean;
    canRedo: boolean;
}

class TimeTravel implements I_TimeTravel {
    render: any;
    canUndo: boolean;
    canRedo: boolean;

    constructor() {
        this.canUndo = false;
        this.canRedo = false;
    }

    notify(undoStackSize: number, redoStackSize: number) {
        let canUndo = undoStackSize !== 0;
        let canRedo = redoStackSize !== 0;
        if (canUndo !== this.canUndo || canRedo !== this.canRedo) {
            this.canUndo = canUndo;
            this.canRedo = canRedo;
            this.render();
        }
    }
}

export const timeTravel = new TimeTravel()