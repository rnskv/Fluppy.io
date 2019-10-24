import ParalaxObject from "../core/ParalaxObject";
import * as PIXI from "pixi.js";

class Roof extends ParalaxObject {
  constructor(props) {
    super(props);
    this.width = 2133;
    this.height = 1200;
    this.paralaxFactors = {
      x: -0.3,
      y: -0.5
    };
  }

  createObject() {
    const container = new PIXI.Container();

    let sprite = PIXI.Sprite.from('/resources/images/background_1.png');

    container.addChild(sprite);
    return container;
  }
}

export default Roof;
