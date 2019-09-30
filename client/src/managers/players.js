import Player from "../entities/Player";
import Manager from "../core/Manager";

class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params});
    }

    isCurrentPlayer(id) {
        return this.managers.global.stores.player.get('id') === id
    }

    selector(objectData) {
        return {
            controller: this.managers.global,
            id: objectData.id,
            x: objectData.x,
            y: objectData.y,
            width: objectData.width,
            height: objectData.height,
            isCurrentPlayer: this.isCurrentPlayer(objectData.id),
            viewRadius: this.managers.global.stores.main.get('settings').viewRadius,
            methods: {
                generateNewFloor: this.generateNewFloor.bind(this)
            }
        }
    }

    generateNewFloor(x, y) {
        this.managers.floors.add({
            x: x,
            y: 0
        })
    }
}

export default PlayersManager;