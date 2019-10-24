import Client from "./core/Client";
import Network from "./core/Network";
import Camera from "./core/Camera";

import PlayersManager from "./managers/players";
import PipesManager from "./managers/pipes";
import FloorsManager from "./managers/floors";
import CheckPointsManager from "./managers/checkpoints";
import RoofsManager from "./managers/roofs";
import BackgroundsManager from "./managers/backgrounds";


import PlayerStore from "./stores/PlayerStore";
import MainStore from "./stores/MainStore";

import Controller from "./core/Controller";

import Player from "./entities/Player";
import Pipe from "./entities/Pipe";
import Floor from "./entities/Floor";
import CheckPoint from "./entities/CheckPoint";
import Roof from "./entities/Roof";
import Background from "./entities/Background";

import EventEmitter from "shared/core/EventEmitter";

import Proton from "./Proton";

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
      backgrounds: new BackgroundsManager({
        entity: Background
      }),
      pipes: new PipesManager({
        entity: Pipe
      }),
      floors: new FloorsManager({
        entity: Floor
      }),
      roofs: new RoofsManager({
        entity: Roof
      }),
      players: new PlayersManager({
        entity: Player
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
      emitter: EventEmitter
    });
  }

  createGame() {
    this.game = new Proton({
      app: this.app,
      controller: this.controller,
      settings: {
        interpolate: true,
        renderDelay: 60
      }
    });
  }

  loadManifest() {
    this.game.loader.addManifest({
      wordAssests: "/resources/jsons/wordassets.json",
      pipe: "/resources/jsons/pipe.png",
      viking: "/resources/jsons/viking.json",
      background: "/resources/images/background.png",
      player: "/resources/images/player.png",
      background1: "/resources/images/background_1.png"
    });

    this.game.loader.load((loader, resources) => {
      //@todo Вынести эту логику в другое место.
      this.game.controller.stores.main.set("resources", resources);
      this.game.start();
    });
  }

  build() {

    console.log('create build')
    this.createApp();
    this.createCamera();
    this.createController();
    this.createGame();
    console.log('create build', this.game)
    this.loadManifest();
  }
}

export default Builder;
