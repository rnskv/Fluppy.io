import Pipe from "../entities/Pipe";
import Manager from "../core/Manager";

class PlayersManager extends Manager {
    constructor() {
        super();
    }

    add(stage, objectData) {
        if (super.add(stage, objectData)) {
            const pipe = new Pipe({
                stage,
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