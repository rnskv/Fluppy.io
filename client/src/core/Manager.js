import Player from "../entities/Player";

class Manager {
    constructor() {
        this.map = {};
    }

    get list() {
        return Object.values(this.map);
    }

    isExist(id) {
        return Boolean(this.map[id]);
    }

    get(id) {
        return this.map[id];
    }

    add(stage, objectData) {
        return !this.isExist(objectData.id)
    }

    remove(id) {
        if (!this.isExist(id)) return;
        const object = this.map[id];
        delete this.map[id];
        object.removeFromStage();
    }
}

export default Manager;