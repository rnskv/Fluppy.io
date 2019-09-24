import Manager from "../core/Manager";
import Player from '../entities/Player';

class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params})
    }

    addPlayer(id) {
        const player = new Player({id, x: 0, y: 0});

        const isAdded = this.addObject(id, player);

        if (isAdded) {
            this.network.io.emit('game:player:join', player.clientData)
        }
    }

    removePlayer(id) {
        const isRemoved = this.removeObject(id);

        if (isRemoved) {
            this.network.io.emit('game:player:leave', id);
        }
    }

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