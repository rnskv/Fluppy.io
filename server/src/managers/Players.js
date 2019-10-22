import Manager from "../core/Manager";
import settings from "../configs/settings";
import * as SHAPES from "../types/shapes";
import request from 'request';
import servers from 'shared/configs/servers';

class PlayersManager extends Manager {
  constructor({ ...params }) {
    super({ ...params });

    this.spawnPipe = this.spawnPipe.bind(this);
  }

  init(controller) {
    super.init(controller);
    controller.collider.addCollisionManager("players", this);
  }

  selector(objectParams) {
    return {
      id: objectParams.id,
      _id: objectParams._id,
      uid: objectParams.uid,
      isBot: objectParams.isBot,
      x: objectParams.x,
      y: objectParams.y,
      name: objectParams.name,
      methods: {
        spawnPipe: this.spawnPipe
      },
      shapeType: SHAPES.CIRCLE
    };
  }

  onJoinHandler(socket, playerData) {
    /**** ПРИМЕР *****/
    console.log('ON JOIN', playerData.accessToken)
    this.controller.api.setToken(playerData.accessToken);
    this.controller.api.execute({
      name: 'player.get'
    }).then((body) => {
      const playerData = JSON.parse(body).body;
      console.log('THEN', playerData)
      if (!playerData) return;

      //Посмотреть _id если шо использовать вместо сокета.
      const player = {
        _id: playerData._id,
        uid: playerData.uid,
        x: playerData.x,
        y: playerData.y,
        name: playerData.lastName
      };

      socket.player = this.addObject({
        id: playerData._id,
        isBot: false,
        ...player
      });

      socket.emit("me:init", { id: socket.player._id, settings });
    });
  }

  onLeaveHandler(socket) {
    if (this.objects.remove(socket.player._id)) {
      this.network.io.emit("game:player:leave", socket.player._id);
    }
  }

  onDisconnectHandler(socket) {
    if (!socket.player) return;
    if (this.objects.remove(socket.player._id)) {
      console.log(socket.player)
      this.controller.api.execute(
        {name: 'users.update', params: { id: socket.player._id } },
        {
          json: { set: {
              x: socket.player.x,
              y: socket.player.y,
          }}
        }
      ).then(() => {
        console.log('Update player user');
      });
      this.network.io.emit("game:player:leave", socket.player._id);
    }
  }

  onClickHandler(socket) {
    if (socket.player) {
      socket.player.onClick();
    }
  }

  spawnPipe(x) {
    const lastPipe = this.controller.managers.pipes.objects.last;

    if (lastPipe && lastPipe.x < x + settings.viewRadius) {
      this.controller.managers.pipes.spawnPipes();
    }
  }

  subscribe() {
    this.network.subscribe("game:join", this.onJoinHandler.bind(this));
    this.network.subscribe("game:leave", this.onLeaveHandler.bind(this));
    this.network.subscribe("disconnect", this.onDisconnectHandler.bind(this));

    this.network.subscribe("game:player:click", this.onClickHandler.bind(this));
  }
}

export default PlayersManager;
