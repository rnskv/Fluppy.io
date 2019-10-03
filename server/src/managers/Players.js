import Manager from "../core/Manager";
import settings from '../configs/settings';

let botsCount = 0;
class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params});

        this.spawnPipe = this.spawnPipe.bind(this);

        setInterval(() => {
            botsCount++;
            if (botsCount < 10) {
                this.onJoinHandler({ id: Math.random(), isBot: true})
            }
        }, 1000)
    }

    init(controller) {
        super.init(controller);
        controller.collider.addCollisionManager('players', this);
    }

    addPlayer(id, isBot) {
        const player = new this.entity({id, isBot, x: 0, y: 0, methods: {
            spawnPipe: this.spawnPipe
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
        this.addPlayer.call(this, socket.id, socket.isBot || false);
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

    spawnPipe(x) {
        const lastPipe = this.controller.managers.pipes.getLast();

        if (lastPipe && lastPipe.x < x + settings.viewRadius) {
            this.controller.managers.pipes.spawnPipes();
        }
    }

    subscribe() {
        this.network.subscribe('game:join', this.onJoinHandler.bind(this));
        this.network.subscribe('game:leave', this.onLeaveHandler.bind(this));
        this.network.subscribe('disconnect', this.onDisconnectHandler.bind(this));

        this.network.subscribe('game:player:click', this.onClickHandler.bind(this));
    }
}

export default PlayersManager;