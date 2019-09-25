class GlobalManager {
    constructor(managers) {
        this.managers = managers;

        this.initGraph();
    }

    get list() {
        return Object.values(this.managers);
    }

    get names() {
        return Object.keys(this.managers);
    }

    get(name) {
        return this.managers[name]
    }

    getStateForPlayerByRules(player, rules) {
        let result = {};
        if (player) {
            this.names.forEach(managerName => {
                result[managerName] = this.get(managerName).getDatasetInRadiusFromPoint(player.x, player.y)
            });
        }
        return result;
    }

    initGraph() {
        const players = this.get('players');
        const pipes =  this.get('pipes');

        players.connectManager('pipes', pipes)
    }

    update(dt) {
        this.list.forEach(manager => {
            manager.update(dt)
        })
    }
}

export default GlobalManager;