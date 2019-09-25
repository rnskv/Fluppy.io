import Player from "../entities/Player";
import Manager from "../core/Manager";

class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params});
    }

    add(objectData) {
        const { stage } = this;
        if (super.add(objectData)) {
            const player = new Player({
                stage,
                camera: this.camera,
                id: objectData.id,
                x: objectData.x,
                y: objectData.y,
                isCurrentPlayer: this.managers.global.clientState.playerId === objectData.id
            });

            this.map[objectData.id] = player;
            player.addToStage();
        }
    }
}

export default PlayersManager;