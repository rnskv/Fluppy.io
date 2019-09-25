class Manager {
    constructor({ network }) {
        this.network = network;

        this.objects = new Map();
        this.managers = {};

        this.subscribe();
        this.update = this.update.bind(this);
    }

    getById(id) {
        return this.objects.get(id);
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

            if (c < 250) {
                result[entity.id] = entity.clientData;
            }
        }

        return result;
    }

    subscribe() {
        /* */
    }

    connectManager(name, manager) {
        this.managers[name] = manager;
    }

    addObject(id, object) {
        if (this.objects.has(id)) return false;
        this.objects.set(id, object);
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