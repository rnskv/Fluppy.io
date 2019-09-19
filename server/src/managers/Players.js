import Player from '../core/Player';

class PlayersManager {
    constructor({ network }) {
        this.network = network;

        this.map = {};
        this.subscribe();
        console.log('initPlayersManager')
        this.update = this.update.bind(this);
    }

    addPlayer(id) {
        const player = new Player(id, 0, 0);
        this.map[id] = player;
        this.network.io.emit('game:player:join', player.clientData)
    }

    removePlayer(id) {
        this.network.io.emit('game:player:leave', id)
        delete this.map[id]
    }

    update(dt) {
        Object.keys(this.map).forEach(playerId => {
            if (this.map[playerId]) {
                this.map[playerId].update(dt);
            }
        })
    }

    get array() {
        // return Object.keys(this.map).map(key => this.map[key].clientData)
        return this.map;
    }

    onJoinHandler(socket) {
        console.log('join', this)
        this.addPlayer.call(this, socket.id);
    }

    onLeaveHandler(socket) {
        this.removePlayer.call(this, socket.id);
    }

    onDisconnectHandler(socket) {
        this.removePlayer.call(this, socket.id);
    }

    subscribe() {
        this.network.subscribe('game:join', this.onJoinHandler.bind(this));
        this.network.subscribe('game:leave', this.onLeaveHandler.bind(this));
        this.network.subscribe('disconnect', this.onDisconnectHandler.bind(this));
    }

}

export default PlayersManager;