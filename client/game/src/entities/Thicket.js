import ParalaxObject from "../core/ParalaxObject";
import * as PIXI from "pixi.js";

class Silhouette extends ParalaxObject {
  constructor({ ...params }) {
    super(params);
    this.width = 1400;
    this.height = 400;
    this.offsets = {
      x: 0,
      y: -300
    };
  }

  createObject() {
    const textures = [PIXI.Texture.from("01_front_silhouette.png")];

    const sprite = new PIXI.Sprite(textures[0]);

    sprite.width = this.width;
    sprite.height = this.height;

    return sprite;
  }
}

export default Silhouette;
