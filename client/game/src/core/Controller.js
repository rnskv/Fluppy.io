export default class Controller {
  constructor({ app, emitter, managers, stores, camera, stage, paralaxer }) {
    this.managers = managers || {};
    this.stores = stores || {};
    this.paralaxer = paralaxer;
    this.camera = camera;
    this.stage = stage;
    this.emitter = emitter;
    this.app = app;

    this.setControllerToManagers();
    this.setControllerToParalaxer();
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
    return this.managers[name];
  }

  addManager(name, manager) {
    this.managers[name] = manager;
    manager.connectController(this);
    manager.init();
  }

  setControllerToManagers() {
    for (const [name, manager] of this.managersEntries) {
      this.addManager(name, manager)
    }
  }

  setControllerToParalaxer() {
    this.paralaxer.connectController(this);
  }
}
