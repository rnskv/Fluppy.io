import Player from "../entities/Player";

class Manager {
    constructor() {
        this.map = {};
        this.actives = {};
    }

    get list() {
        return Object.values(this.actives);
    }

    isExist(id) {
        return Boolean(this.map[id]);
    }

    moveToActive(id) {
        const object = this.get(id);
        if (!object) return;
        this.actives[id] = object;
        object.show();
    }

    clearActives() {
        this.list.forEach(object => {
            if (!object) return;
            object.hide();
        });

        this.actives = {}
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