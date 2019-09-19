const settings = {
    perfectFramerate: 1000 / 60,
    actualFrameRate: 1000 / 10,
}

export default class Server {
    constructor({ network, managers }) {
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
        this.tickerId = setInterval(this.tick.bind(this), settings.actualFrameRate)
    }

    stop() {
        clearInterval(this.tickerId);
    }

    get state() {
        const { players } = this.managers;

        return {
            players: players.array
        }
    }

    tick() {
        const now = Date.now();
        const dt =  1 / (settings.perfectFramerate / (now - this.lastUpdate));
        this.lastUpdate = now;

        const { players } = this.managers;

        players.update(dt);

        this.network.io.emit('game:update', {
            state: this.state,
            timestamp: Date.now()
        });
    }
}