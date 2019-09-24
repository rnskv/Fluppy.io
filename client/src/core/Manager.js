import Player from "../entities/Player";

class Manager {
    constructor() {
        this.map ={};
    }

    get list() {
        return Object.values(this.map);
    }

    isExist(id) {
        return Boolean(this.map[id]);
    }

    add(stage, objectData) {
        return !this.isExist(objectData.id)
    }

    remove(id) {
        if (!this.isExist(id)) return;
        const player = this.map[id];
        player.removeFromStage();
        delete this.map[id];
    }
}

export default Manager;