import Manager from "../core/Manager";
import settings from '../configs/settings';
import * as SHAPES from '../types/shapes';

class PlayersManager extends Manager {
    constructor({...params}) {
        super({...params});

        this.spawnPipe = this.spawnPipe.bind(this);
    }

    init(controller) {
        super.init(controller);
        controller.collider.addCollisionManager('players', this);
    }

    selector(objectParams) {
      console.log('Забрали данные из селектора', {
        id: objectParams.id,
        isBot: objectParams.isBot,
        x: objectParams.x,
        y: objectParams.y,
        name: objectParams.name,
        uid: objectParams.uid,
        methods: {
          spawnPipe: this.spawnPipe
        },
        shapeType: SHAPES.CIRCLE
      })
        return {
            id: objectParams.id,
            isBot: objectParams.isBot,
            x: objectParams.x,
            y: objectParams.y,
            name: objectParams.name,
            uid: objectParams.uid,
            methods: {
                spawnPipe: this.spawnPipe
            },
            shapeType: SHAPES.CIRCLE
        }
    }

    onJoinHandler(socket, playerData) {
        console.log('join', playerData);
        /**** ПРИМЕР *****/
        const players = {
          'rnskv': {
            uid: 'rnskv',
            x: 50,
            y: 10,
            name: 'Ромка'
          },
          'test': {
            uid: 'test',
            x: 50,
            y: 600,
            name: 'Тестовый пользователь'
          }
        };

        const player = players[playerData.uid];

        if (!player) return;

        console.log('Игрок прошел валидацию');
        /**** ПРИМЕР *****/
        if (
            this.addObject({
              id: socket.id,
              isBot: false,
              ...player
            })
        ) {
            this.network.io.emit('game:player:join', this.objects.getById(socket.id).clientData)
        }
    }

    onLeaveHandler(socket) {
        if (
            this.objects.remove(socket.id)
        ) {
            this.network.io.emit('game:player:leave', socket.id);
        }
    }

    onDisconnectHandler(socket) {
        if (
            this.objects.remove(socket.id)
        ) {
            this.network.io.emit('game:player:leave', socket.id);
        }
    }

    onClickHandler(socket) {
        const player = this.objects.getById(socket.id);
        if (player) {
            player.onClick()
        }
    }

    spawnPipe(x) {
        const lastPipe = this.controller.managers.pipes.objects.last;

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
