import GameObject from "./GameObject";

import Shape from "./Shape";
import * as SHAPES from "../types/shapes";

class CollisionGameObject extends GameObject {
  constructor({ shapeType = SHAPES.RECT, ...params }) {
    super({ ...params });
    this.hasCollision = true;
    this.shapeType = shapeType;
    this.init = this.init.bind(this);
  }

  init() {
    super.init();
    if (!this.shape) {
      this.setShape(this.shapeType);
    }
  }

  onCollide(object) {
    /* object - enemy */
  }

  setShape(shapeType) {
    switch (shapeType) {
      case SHAPES.CIRCLE: {
        this.shape = new Shape({
          type: SHAPES.CIRCLE,
          radius: this.radius,
          origin: this
        });
        break;
      }
      case SHAPES.RECT: {
        this.shape = new Shape({
          type: SHAPES.RECT,
          width: this.width,
          height: this.height,
          origin: this
        });
        break;
      }
    }
  }
}

export default CollisionGameObject;
