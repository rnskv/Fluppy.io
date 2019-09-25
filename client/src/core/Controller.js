export default class Controller {
    constructor(managers) {
        this.managers = managers || {};
    }

    get managersNames() {
        return Object.keys(this.managers);
    }

    get managersEntries() {
        return Object.entries(this.managers);
    }

    get managersList() {
        return Object.list(this.managers);
    }

    getManager(name) {
        return this.managers[name]
    }
}