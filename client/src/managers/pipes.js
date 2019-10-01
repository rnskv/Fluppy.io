import Pipe from "../entities/Pipe";
import Manager from "../core/Manager";

class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params});
    }

    selector(objectData) {
        return {
            controller: this.controller,
            id: objectData.id,
            width: objectData.width,
            height: objectData.height,
            x: 0,
            y: 0
        }
    }
}

export default PlayersManager;