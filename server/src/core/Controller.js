class Controller {
  constructor({ managers, collider }) {
    this.managers = managers;
    this.collider = collider;

    this.setControllerToManagers.call(this);
  }

  get managersList() {
    return Object.values(this.managers);
  }

  get managersNames() {
    return Object.keys(this.managers);
  }

  get managersEntries() {
    return Object.entries(this.managers);
  }

  getManager(name) {
    return this.managers[name];
  }

  getStateForPlayerByRules(player) {
    let result = {};
    if (player) {
      this.managersNames.forEach(managerName => {
        const manager = this.getManager(managerName);

        switch (manager.emitRule) {
          case "RADIUS": {
            result[managerName] = manager.getDatasetInRadiusFromPoint(
              player.x,
              player.y
            );
            break;
          }

          default: {
            result[managerName] = manager.dataset;
          }
        }
      });
    }
    return result;
  }

  initGraph() {
    const players = this.getManager("players");
    const pipes = this.getManager("pipes");

    players.connectManager("pipes", pipes);
  }

  setControllerToManagers() {
    this.managersList.forEach(manager => {
      manager.init(this);
    });
  }

  update(dt) {
    this.collider.checkCollisionsBetween(
      this.getManager("players"),
      this.getManager("pipes")
    );

    this.managersList.forEach(manager => {
      manager.update(dt);
    });
  }
}

export default Controller;
