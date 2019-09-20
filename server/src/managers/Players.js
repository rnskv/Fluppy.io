import Player from '../entities/Player';

class PlayersManager {
    constructor({ network }) {
        this.network = network;

        this.map = {};
        this.subscribe();
        this.update = this.update.bind(this);
    }

    //Реализовать структуру Map, это ее область ответственности
    isHasPlayer(id) {
        return Boolean(this.map[id]);
    }

    addPlayer(id) {
        if (this.isHasPlayer(id)) return;

        const player = new Player({id, x: 0, y: 0});
        this.map[id] = player;
        this.network.io.emit('game:player:join', player.clientData)
    }

    removePlayer(id) {
        if (!this.isHasPlayer(id)) return;

        delete this.map[id];
        this.network.io.emit('game:player:leave', id);
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

    //Уйти от нейминга add{ManagerName} к add.

    onJoinHandler(socket) {
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