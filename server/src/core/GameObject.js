import Shape from "./Shape";
import * as SHAPES from "../types/shapes";

class GameObject {
  constructor({ id, x, y, radius, width, height, methods, type = 'OBJECT', controller}) {
    this.id = id;
    this.type = type;

    this.x = x;
    this.y = y;

    this.width = width || 10;
    this.height = height || 10;

    this.dx = 1;
    this.dy = 1;

    this.speed = 1;

    this.rotation = 0;

    this.radius = radius || null;

    this.methods = methods;
    this.controller = controller;

    this.update = this.update.bind(this);
  }

  init() {
    /* */
  }

  get clientData() {
    return {
      id: this.id
    };
  }

  update(dt) {
    /* */
  }
}

export default GameObject;
