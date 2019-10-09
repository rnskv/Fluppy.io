import Player from "../entities/Player";
import Manager from "../core/Manager";

class PlayersManager extends Manager {
  constructor({ ...params }) {
    super({ ...params });
  }

  isCurrentPlayer(id) {
    return this.controller.stores.player.get("id") === id;
  }

  selector(objectData) {
    return {
      controller: this.controller,
      id: objectData.id,
      x: objectData.x,
      y: objectData.y,
      radius: objectData.radius,
      uid: objectData.uid,
      name: objectData.name,
      isCurrentPlayer: this.isCurrentPlayer(objectData.id),
      viewRadius: this.controller.stores.main.get("settings").viewRadius,
      methods: {
        generateNewFloor: this.generateNewFloor.bind(this)
      },
      shape: objectData.shape
    };
  }

  generateNewFloor(x, y) {
    this.managers.floors.add({
      x: x,
      y: 0
    });
  }
}

export default PlayersManager;
