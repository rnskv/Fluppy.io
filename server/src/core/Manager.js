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

    init(controller) {
        this.connectController(controller);
        console.log('Manager was inited', controller)
    }

    getById(id) {
        return this.objects.get(id);
    }

    getLast() {
        if (!this.objects.size) return null;
        return Array.from(this.objects)[this.objects.size - 1][1]
    }

    getUniqueId() {
        return ++this.lastGeneratedId;
    }

    get list() {
        return Array.from(this.objects.values())
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

    connectCollider(collider) {
        this.collider = collider;
    }

    connectManager(name, manager) {
        this.managers[name] = manager;
    }

    addObject(object) {
        if (this.objects.has(object.id)) return false;

        this.objects.set(object.id, object);
        object.init();

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