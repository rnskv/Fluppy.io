import io from "socket.io-client";

import Client from "./core/Client";
import Network from "./core/Network";
import Camera from "./core/Camera";

import PlayersManager from "./managers/players";
import PipesManager from "./managers/pipes";
import CheckPointsManager from "./managers/checkpoints";

import Paralaxer from './core/Paralaxer';

import PlayerStore from "./stores/PlayerStore";
import MainStore from "./stores/MainStore";

import Controller from "./core/Controller";

import Player from "./entities/Player";
import Pipe from "./entities/Pipe";
import CheckPoint from "./entities/CheckPoint";

import EventEmitter from "shared/core/EventEmitter";

import Proton from "./Proton";
import servers from "shared/configs/servers";


class Builder {
  constructor(client) {
    this.client = client;
  }

  get app() {
    return this.client.getApp("game");
  }

  get stage() {
    return this.app.stage;
  }

  createApp() {
    this.client.createApp("game");
  }

  createCamera() {
    this.camera = new Camera({ size: this.client.size });
  }

  createController() {
    const managers = {
      pipes: new PipesManager({
        entity: Pipe
      }),
      players: new PlayersManager({
        entity: Player,
        zIndex: 2
      }),
      checkpoints: new CheckPointsManager({
        entity: CheckPoint
      })
    };

    const stores = {
      player: new PlayerStore({
        id: null
      }),
      main: new MainStore({
        settings: null,
        resources: null
      })
    };

    this.controller = new Controller({
      managers,
      stores,
      camera: this.camera,
      stage: this.stage,
      emitter: EventEmitter,
      app: this.app,
      paralaxer: this.paralaxer
    });
  }

  createParalaxer() {
    this.paralaxer = new Paralaxer({});
  }

  createNetwork() {
    EventEmitter.reset();
    return new Promise(resolve => {

      this.network = new Network(io, EventEmitter);
      this.network.connect(servers.urls.server.url());
      this.network.subscribes().then(resolve);
    });
  }

  createGame() {
    this.game = new Proton({
      app: this.app,
      controller: this.controller,
      settings: {
        interpolate: true,
        renderDelay: 50
      }
    });
  }

  loadManifest() {
    this.game.loader.addManifest({
      wordAssests: "/resources/jsons/wordassets.json",
      viking: "/resources/jsons/viking.json",
      background: "/resources/images/background.png",
      player1: "/resources/images/player1.png",
      player2: "/resources/images/player2.png",
      player3: "/resources/images/player3.png",
      pipeEnd: "/resources/images/pipe_end.png",
      pipe: "/resources/images/pipe.png",

      BG_decor: "/resources/images/background/BG_Decor.png",
      Foreground: "/resources/images/background/Foreground.png",
      Ground: "/resources/images/background/Ground.png",
      Middle_decor: "/resources/images/background/Middle_Decor.png",
      Sky: "/resources/images/background/Sky.png",
    });

    this.game.loader.load((loader, resources) => {
      //@todo Вынести эту логику в другое место.
      this.game.controller.stores.main.set("resources", resources);
      this.game.start();
    });
  }

  build() {
    this.createNetwork().then(() => {
      this.createApp();
      this.createCamera();
      this.createParalaxer();
      this.createController();
      this.createGame();
      this.loadManifest();
    });
  }
}

export default Builder;
