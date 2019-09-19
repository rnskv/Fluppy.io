import Player from "../core/GameObject";

class PlayersManager {
    constructor() {
        this.map ={};
    }

    get list() {
        return Object.values(this.map);
    }

    playerIsActive(id) {
        return Boolean(this.map[id]);
    }

    add(stage, playerData) {
        if (this.playerIsActive(playerData.id)) return;

        const player = new Player({
            stage,
            id: playerData.id,
            x: 0,
            y: 0
        });

        this.map[playerData.id] = player;

        player.addToStage();
    }

    remove(id) {
        if (!this.playerIsActive(id)) return;
        const player = this.map[id];
        player.removeFromStage();
        delete this.map[id];
    }

}

export default PlayersManager;