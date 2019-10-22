import CollisionGameObject from "../core/CollisionGameObject";
import settings from "../configs/settings";

class Pipe extends CollisionGameObject {
  constructor({ position, wholeSize, shift, ...params }) {
    super({ position, ...params });

    this.dx = 0;
    this.dy = 1;

    this.width = 100;
    this.height =
      Math.abs(settings.map.border.top) + Math.abs(settings.map.border.bottom);
    this.position = position;

    if (position === "top") {
      this.y = settings.map.border.top - this.height / 2 - wholeSize;
      this.height = this.height + shift + wholeSize;
    }

    if (position === "bottom") {
      this.y = settings.map.border.bottom - this.height / 2+ shift + wholeSize;
      this.height = this.height - shift - wholeSize

    }
  }

  get clientData() {
    return {
      id: this.id,
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y,
      position: this.position,
      shape: this.shape.size
    };
  }

  update(dt) {
    // if (this.distance > 100) {
    //     this.dy = -this.x / 1000;
    // }
    //
    // if (this.distance < -100) {
    //     this.dy = this.x / 1000;
    // }
    //
    // if (this.x > 1000) {
    //     this.distance += this.dy;
    //
    //     this.y += this.dy;
    // }
  }
}

export default Pipe;
