import Manager from "../core/Manager";

class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params})
    }

    addPlayer(id) {
        const player = new this.entity({id, x: 0, y: 0, methods: {
            spawnPipe: this.spawnPipe.bind(this)
        }});

        const isAdded = this.addObject(player);

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

    onClickHandler(socket) {
        const player = this.getById(socket.id);
        if (player) {
            player.onClick()
        }
    }

    spawnPipe(x, y) {
        //Делаем что то с менеджерами PIPES
        console.log('spawn pipe')
        this.controller.managers.pipes.addPipe(Math.random(), {
            x: x,
            y: 10
        })
    }

    subscribe() {
        this.network.subscribe('game:join', this.onJoinHandler.bind(this));
        this.network.subscribe('game:leave', this.onLeaveHandler.bind(this));
        this.network.subscribe('disconnect', this.onDisconnectHandler.bind(this));

        this.network.subscribe('game:player:click', this.onClickHandler.bind(this));
    }
}

export default PlayersManager;