import Pipe from "../entities/Pipe";
import Manager from "../core/Manager";

class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params});
    }

    add(objectData) {
        const { stage } = this;
        if (super.add(objectData)) {
            const pipe = new Pipe({
                stage,
                camera: this.managers.global.camera,
                id: objectData.id,
                x: 0,
                y: 0
            });
            this.map[objectData.id] = pipe;
            pipe.addToStage();
        }
    }
}

export default PlayersManager;