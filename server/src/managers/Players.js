import Manager from "../core/Manager";
import settings from '../configs/settings';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}


class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params});

        this.spawnPipe = this.spawnPipe.bind(this);
    }

    addPlayer(id) {
        const player = new this.entity({id, x: 0, y: 0, methods: {
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

    spawnPipe(x) {
        //Делаем что то с менеджерами PIPES
        const lastPipe = this.controller.managers.pipes.getLast();
        //Код для примера - верстать все в зад
        if (lastPipe && lastPipe.x < x + settings.viewRadius) {
            const width = 100;
            const height = 350;

            // const firstHeight = getRandomInt(100, 300);
            // const secondHeight = getRandomInt(
            //     settings.map.border.bottom + Math.abs(settings.map.border.top) - firstHeight - 240,
            //     settings.map.border.bottom + Math.abs(settings.map.border.top) - firstHeight - 150
            // );

            const a =  getRandomInt(0, 400);
            const b = getRandomInt(100, 200);

            this.controller.managers.pipes.addPipe(this.getUniqueId(),
                {
                    x: lastPipe.x + 350,
                    y: settings.map.border.top + a - b,
                    width,
                    height: height
                });

            this.controller.managers.pipes.addPipe(this.getUniqueId(),
                {
                    x: lastPipe.x + 350,
                    y: settings.map.border.bottom - height + a,
                    width,
                    height: height
                })
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