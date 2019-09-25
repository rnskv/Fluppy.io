export default class Server {
    constructor({ network, managers, settings }) {
        this.settings = settings;
        this.network = network;
        this.players = {};
        this.managers = managers;
        this.lastUpdate = Date.now();
        this.tickerId = null;
        this.network.subscribe('game:join', (socket) => {
            socket.emit('me:init', this.state);
        });

        this.createManagersGraph();

    }

    createManagersGraph() {
        const { players, pipes } = this.managers;
        players.connectManager('pipes', pipes)
    }

    start() {
        this.stop();
        this.tickerId = setInterval(this.tick.bind(this), this.settings.serverFrameRate)
    }

    stop() {
        clearInterval(this.tickerId);
    }

    get state() {
        const { players, pipes } = this.managers;

        return {
            players: players.dataset,
            pipes: pipes.dataset
        }
    }

    getStateForPlayer(player) {
        let result = {};

        if (player) {
            Object.keys(this.managers).forEach(managerName => {
                result[managerName] = this.managers[managerName].getDatasetInRadiusFromPoint(player.x, player.y)
            });
        }

        return result
    }

    callManagersUpdates(dt) {
        Object.values(this.managers).forEach(manager => {
            manager.update(dt)
        })
    }

    emitUpdate(socket) {
        const { players } = this.managers;

        const player = players.getById(socket.id);
        if (player) {
            socket.emit('game:update', {
                state: this.getStateForPlayer(player),
                timestamp: Date.now()
            });
        }
    }

    tick() {
        const now = Date.now();
        const dt =  1 / (this.settings.clientFrameRate / (now - this.lastUpdate));
        this.lastUpdate = now;

        this.callManagersUpdates(dt);

        this.network.sockets.forEach(this.emitUpdate.bind(this));
    }
}