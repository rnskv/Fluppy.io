import CollisionGameObject from "../core/CollisionGameObject";
import settings from "../configs/settings";

class CheckPoint extends CollisionGameObject {
  constructor({...params }) {
    super({...params });
    this.type = 'CHECKPOINT';
    this.width = 20;
  }

  get clientData() {
    return {
      id: this.id,
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y,
      shape: this.shape.size
    };
  }
}

export default CheckPoint;
