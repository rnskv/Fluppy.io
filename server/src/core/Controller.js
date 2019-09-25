class Controller {
    constructor(managers) {
        this.managers = managers;

        this.initGraph();
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
        return this.managers[name]
    }

    getStateForPlayerByRules(player, rules) {
        let result = {};
        if (player) {
            this.managersNames.forEach(managerName => {
                result[managerName] = this.getManager(managerName).getDatasetInRadiusFromPoint(player.x, player.y)
            });
        }
        return result;
    }

    initGraph() {
        const players = this.getManager('players');
        const pipes =  this.getManager('pipes');

        players.connectManager('pipes', pipes)
    }

    update(dt) {
        this.managersList.forEach(manager => {
            manager.update(dt)
        })
    }
}

export default Controller;