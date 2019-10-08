export default class Controller {
    constructor({managers, stores, camera, stage}) {
        this.managers = managers || {};
        this.stores = stores || {};
        this.camera = camera;
        this.stage = stage;
        this.setControllerToManagers();
    }

    get managersNames() {
        return Object.keys(this.managers);
    }

    get managersEntries() {
        return Object.entries(this.managers);
    }

    get managersList() {
        return Object.values(this.managers);
    }

    getManager(name) {
        return this.managers[name]
    }

    setControllerToManagers() {
        this.managersList.forEach(manager => {
            manager.connectController(this);
            manager.init();
        })
    }
}