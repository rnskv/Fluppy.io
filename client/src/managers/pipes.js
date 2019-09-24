import Pipe from "../entities/Player";
import Manager from "../core/Manager";

class PlayersManager extends Manager {
    constructor() {
        super();
    }

    add(stage, objectData) {
        if (super.add(stage, objectData)) {
            const player = new Player({
                stage,
                id: objectData.id,
                x: 0,
                y: 0
            });
            this.map[objectData.id] = player;
            player.addToStage();
        }
    }
}

export default PlayersManager;