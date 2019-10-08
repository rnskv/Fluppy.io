import ParalaxObject from "../core/ParalaxObject";
import * as PIXI from "pixi.js";

class Silhouette extends ParalaxObject {
  constructor(params) {
    super(params);
    this.width = 1400;
    this.height = 300;
    this.offsets = {
      x: 0,
      y: -200
    };
  }

  createObject() {
    const textures = [PIXI.Texture.from("03_rear_silhouette.png")];

    const sprite = new PIXI.Sprite(textures[0]);

    sprite.width = this.width;
    sprite.height = this.height;

    return sprite;
  }
}

export default Silhouette;
