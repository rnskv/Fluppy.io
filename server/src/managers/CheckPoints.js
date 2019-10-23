import Manager from "../core/Manager";

class CheckPointsManager extends Manager {
  constructor({ ...params }) {
    super({ ...params });
  }

  init(controller) {
    super.init(controller);
    controller.collider.addCollisionManager("checkpoints", this);
  }

  selector(objectParams) {
    return {
      id: objectParams.id,
      x: objectParams.x,
      y: objectParams.y,
      height: objectParams.height,
    };
  }

  spawnCheckPoint(x, y, height) {
    console.log('try spawn', x, y, height);
    this.addObject({
      id: this.objects.uniqueId,
      x,
      y,
      height
    });
  }
}

export default CheckPointsManager;
