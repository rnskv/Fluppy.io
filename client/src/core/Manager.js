import * as PIXI from 'pixi.js';
import ObjectPool from 'shared/core/ObjectsPool';

class Manager {
    constructor({ entity }) {
        this.objects = new ObjectPool({type: 'OBJECTS'});

        this.actives = {};
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

    moveToActive(id) {
        const object = this.objects.getById(id);
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

    selector(objectData) {
        return {};
    }

    add(objectData) {
        const data = this.selector(objectData);

        if (this.isEnvironment) {
            data.id = this.getUniqueId();
        }

        if (!this.objects.isExist(data.id)) {
            const entity = new this.entity(
                {
                    ...data,
                    container: this.container
                });

            this.objects.add(data.id, entity);
            entity.addToStage();

            return entity;
        } else {
            throw new Error(`Object id isn't unique`)
        }
    }

    remove(id) {
        if (!this.objects.isExist(id)) return;
        const object = this.objects.getById(id);
        object.removeFromStage();
        this.objects.remove(id);
    }

    getActiveObjects(updates) {
        return Object.values(updates);
    }

    update(dt, updates) {
        this.clearActives();
        this.getActiveObjects(updates).forEach(data => {
            this.moveToActive(data.id);
            if (this.objects.isExist(data.id)) {
                this.objects.getById(data.id).update(dt, data)
            } else {
                this.add(data).update(dt, data);
            }
        });
    }
}

export default Manager;