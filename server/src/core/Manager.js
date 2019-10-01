import settings from "../configs/settings";

class Manager {
    constructor({ network, entity }) {
        this.network = network;
        this.entity = entity;

        this.objects = new Map();
        this.managers = {};
        this.controller = null;
        this.isEnvironment = false;

        this.subscribe();

        this.lastGeneratedId = 0;
        this.update = this.update.bind(this);
    }

    init() {
        console.log('Manager was inited')
    }

    getById(id) {
        return this.objects.get(id);
    }

    getLast() {
        return Array.from(this.objects)[this.objects.size - 1][1]
    }

    getUniqueId() {
        // console.log('getId',  this.lastGeneratedId)
        return ++this.lastGeneratedId;
    }

    get list() {
        return this.objects.values()
    }

    get dataset() {
        let result = {};

        for (let entity of this.objects.values()) {
            result[entity.id] = entity.clientData;
        }

        return result;
    }

    getDatasetInRadiusFromPoint(x, y) {
        let result = {};

        for (let entity of this.objects.values()) {

            const a = x - entity.x;
            const b = y - entity.y;

            const c = Math.sqrt( a*a + b*b );

            if (c < settings.viewRadius) {
                result[entity.id] = entity.clientData;
            }
        }

        return result;
    }

    subscribe() {
        /* */
    }

    connectController(controller) {
        this.controller = controller;
    }

    connectManager(name, manager) {
        this.managers[name] = manager;
    }

    addObject(object) {
        if (this.objects.has(object.id)) return false;

        this.objects.set(object.id, object);
        return true;
    }

    removeObject(id) {
        if (!this.objects.has(id)) return false;
        this.objects.delete(id);
        return true;
    }

    update(dt) {
        for (let object of this.objects.values()) {
            object.update(dt);
        }
    }
}

export default Manager;