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
    }


    start() {
        this.stop();
        this.tickerId = setInterval(this.tick.bind(this), this.settings.serverFrameRate)
    }

    stop() {
        clearInterval(this.tickerId);
    }

    get state() {
        const { players } = this.managers;

        return {
            players: players.dataset
        }
    }

    tick() {
        const { players } = this.managers;

        const now = Date.now();
        const dt =  1 / (this.settings.clientFrameRate / (now - this.lastUpdate));
        this.lastUpdate = now;

        players.update(dt);

        this.network.io.emit('game:update', {
            state: this.state,
            timestamp: Date.now()
        });
    }
}