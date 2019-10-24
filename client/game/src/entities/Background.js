import ParalaxObject from "../core/ParalaxObject";
import * as PIXI from "pixi.js";

class Roof extends ParalaxObject {
  constructor(props) {
    super(props);
    this.width = 1778;
    this.height = 1600;
    this.paralaxFactors = {
      x: 0.3,
      y: 1
    };
    this.offsets = {
      y: -100,
      x: 0
    }
  }

  createObject() {
    const container = new PIXI.Container();

    let sprite = PIXI.Sprite.from('/resources/images/background_1.png');
    sprite.width = this.width;
    sprite.height = this.height;
    container.addChild(sprite);
    return container;
  }
}

export default Roof;
