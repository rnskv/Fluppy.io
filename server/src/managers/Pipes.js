import Manager from "../core/Manager";
import Pipe from '../entities/Pipe';

class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params});

        this.preset = {
            1: {x: 40, y: 20},
            2: {x: 200, y: 200},
        };

        this.init();
    }

    init() {
        for (let [id, data] of Object.entries(this.preset)) {
            this.addPipe(id, data)
        }
    }

    addPipe(id, objectParams) {
        const pipe = new Pipe(
            {
                id,
                x: objectParams.x,
                y: objectParams.y
            }
        );

        const isAdded = this.addObject(id, pipe);
    }

    connectManager(name, manager) {
        super.connectManager(name, manager);
        console.log(this.managers)
    }

    removePipe(id) {
        const isRemoved = this.removeObject(id);
    }

    update(dt) {
        super.update(dt);
        console.log(this.managers)
    }
}

export default PlayersManager;