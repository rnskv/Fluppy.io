import ParalaxObject from "../core/ParalaxObject";
import * as PIXI from "pixi.js";

class Leave extends ParalaxObject {
  constructor(params) {
    super(params);
    this.width = 1200;
    this.height = 260;
    this.offsets = {
      x: 0,
      y: -40
    };
  }

  createObject() {
    const textures = [PIXI.Texture.from("02_front_canopy.png")];

    const sprite = new PIXI.Sprite(textures[0]);

    sprite.width = this.width;
    sprite.height = this.height;

    return sprite;
  }
}

export default Leave;
