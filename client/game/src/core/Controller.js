import ObjectPool from 'shared/core/ObjectsPool';

export default class Controller {
  constructor({ app, emitter, managers, stores, camera, stage, paralaxer }) {
    this.managers = new ObjectPool({ initValue: managers });
    this.stores = stores || {};
    this.paralaxer = paralaxer;
    this.camera = camera;
    this.stage = stage;
    this.emitter = emitter;
    this.app = app;

    this.setControllerToManagers();
    this.setControllerToParalaxer();
  }

  getManager(name) {
    return this.managers.getById(name);
  }

  addManager(name, manager) {
    this.managers.add(name, manager);
    manager.connectController(this);
    manager.init();
    console.log('manager.init')
  }

  setControllerToManagers() {
    for (const [name, manager] of this.managers.entries) {
      this.addManager(name, manager)
    }
  }

  setControllerToParalaxer() {
    this.paralaxer.connectController(this);
  }
}
