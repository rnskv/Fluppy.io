import Player from "../entities/Player";
import Manager from "../core/Manager";

class PlayersManager extends Manager {
    constructor() {
        super();
    }

    add(stage, objectData, isCurrentPlayer) {
        if (super.add(stage, objectData)) {
            const player = new Player({
                stage,
                id: objectData.id,
                x: objectData.x,
                y: objectData.y
            });
            this.map[objectData.id] = player;
            player.addToStage();
        }
    }
}

export default PlayersManager;