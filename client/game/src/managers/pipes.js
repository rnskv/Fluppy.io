import Pipe from "../entities/Pipe";
import Manager from "../core/Manager";

class PipesManager extends Manager {
  constructor({ ...params }) {
    super({ ...params });
  }

  selector(objectData) {
    return {
      controller: this.controller,
      id: objectData.id,
      width: objectData.width,
      height: objectData.height,
      x: objectData.x,
      y: objectData.y,
      shape: objectData.shape,
      position: objectData.position
    };
  }
}

export default PipesManager;
