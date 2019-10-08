import Game from "./core/Game";
import Player from "./entities/Player";
import EventEmitter from "shared/core/EventEmitter";

export default class Proton extends Game {
  constructor({ ...params }) {
    super({ ...params });
  }

  subscribe() {
    super.subscribe();
    const players = this.controller.getManager("players");

    EventEmitter.subscribe("me:init", data => {
      console.log("Init player", data);
      this.controller.stores.player.set("id", data.id);
      this.controller.stores.main.set("settings", data.settings);
    });

    EventEmitter.subscribe("game:player:join", player => {
      console.log("Player join into game");
    });

    EventEmitter.subscribe("game:player:leave", id => {
      players.removeObject(id);
      console.log("Player leave from game");
    });
  }
}
