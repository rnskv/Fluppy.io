import Player from "../entities/Player";
import Manager from "../core/Manager";

class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params});
    }

    isCurrentPlayer(id) {
        return this.managers.global.stores.player.get('id') === id
    }

    add(objectData) {
        const { stage } = this;
        if (super.add(objectData)) {
            const player = new Player({
                stage,
                camera: this.managers.global.camera,
                id: objectData.id,
                x: objectData.x,
                y: objectData.y,
                isCurrentPlayer: this.isCurrentPlayer(objectData.id),
                viewRadius: this.managers.global.stores.main.get('settings').viewRadius,
                methods: {
                    onNewChunck: this.onNewChunck.bind(this)
                }
            });

            this.map[objectData.id] = player;
            player.addToStage();
        }
    }

    onNewChunck(x, y) {
        this.managers.floors.add({
            x: x,
            y: 0
        })
    }
}

export default PlayersManager;