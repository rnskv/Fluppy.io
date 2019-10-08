import ParalaxObject from "../core/ParalaxObject";
import * as PIXI from "pixi.js";

class Forest extends ParalaxObject {
  constructor(params) {
    super(params);
    this.width = 1300;
    this.height = 1000;
    this.offsets = {
      x: 0,
      y: 0
    };
  }

  createObject() {
    const textures = [PIXI.Texture.from("/resources/images/background.png")];

    const sprite = new PIXI.Sprite(textures[0]);

    sprite.width = this.width;
    sprite.height = this.height;

    return sprite;
  }
}

export default Forest;
