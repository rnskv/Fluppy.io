export default class GlobalManager {
    constructor(managers) {
        this.managers = managers || {};
    }

    get list() {
        return Object.values(this.managers);
    }

    get names() {
        return Object.keys(this.managers);
    }

    get entries() {
        return this.managers;
    }

    get(name) {
        return this.managers[name]
    }
}