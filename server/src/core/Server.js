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

    getStateForSocket(socket) {
        const { players, pipes } = this.managers;
        const player = players.getById(socket.id) || {};

        let result = {
            ...this.state
        };

        if (player) {
            result = {
                ...this.state,
                pipes: pipes.getDatasetInRadiusFromPoint(player.x, player.y)
            }
        }
        return result
    }

    tick() {
        const { players, pipes } = this.managers;

        const now = Date.now();
        const dt =  1 / (this.settings.clientFrameRate / (now - this.lastUpdate));
        this.lastUpdate = now;

        players.update(dt);
        pipes.update(dt);

        this.network.sockets.forEach(socket => {
            socket.emit('game:update', {
                state: this.getStateForSocket(socket),
                timestamp: Date.now()
            });
        });
    }
}