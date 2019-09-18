export default class Server {
    constructor({ network, managers }) {
        this.network = network;
        this.players = {};
        this.managers = managers;

        this.tickerId = null;
        this.network.subscribe('game:join', (socket) => {
            socket.emit('me:init', this.state);
        });
    }


    start() {
        this.stop();
        this.tickerId = setInterval(this.tick.bind(this), 1000 / 60)
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
        const { players } = this.managers;

        players.update();

        this.network.io.emit('game:update', this.state);
    }
}