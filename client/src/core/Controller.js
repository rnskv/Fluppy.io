export default class Controller {
    constructor(managers) {
        this.managers = managers || {};
        this.clientState = {
            playerId: null
        }

        this.initGraph();
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

    initGraph() {
        const players = this.getManager('players');
        const pipes =  this.getManager('pipes');

        players.connectManager('global', this)
    }
}