import * as PIXI from 'pixi.js';

class Manager {
    constructor({ entity }) {
        this.map = {};
        this.actives = {};
        this.managers = {};
        this.isEnvironment = false;
        this.entity = entity;
        this.controller = null;
        this.update = this.update.bind(this);

        this.lastGeneratedId = 0;
    }

    get list() {
        return Object.values(this.actives);
    }

    get entries() {
        return Object.entries(this.actives);
    }

    init() {
        this.container = this.getContainer();
        this.controller.stage.addChild(this.container)
    }

    getContainer() {
        return new PIXI.Container();
    }

    getUniqueId() {
        return ++this.lastGeneratedId;
    }

    connectController(controller) {
        this.controller = controller;
    }

    connectManager(name, manager) {
        this.managers[name] = manager;
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

    getLast() {
        return this.list[this.list.length - 1] || {};
    }

    selector(objectData) {
        return {};
    }

    add(objectData) {
        const data = this.selector(objectData);

        if (this.isEnvironment) {
            data.id = this.getUniqueId();
        }

        if (!this.isExist(data.id)) {
            const entity = new this.entity(
                {
                    ...data,
                    container: this.container
                });

            this.map[data.id] = entity;
            entity.addToStage();

            return entity;
        } else {
            throw new Error(`Object id isn't unique`)
        }
    }

    remove(id) {
        if (!this.isExist(id)) return;
        const object = this.map[id];
        delete this.map[id];
        object.removeFromStage();
    }

    getActiveObjects(updates) {
        return Object.values(updates);
    }

    update(dt, updates) {
        this.clearActives();
        this.getActiveObjects(updates).forEach(data => {
            this.moveToActive(data.id);
            if (this.isExist(data.id)) {
                this.get(data.id).update(dt, data)
            } else {
                this.add(data).update(dt, data);
            }
        });
    }
}

export default Manager;