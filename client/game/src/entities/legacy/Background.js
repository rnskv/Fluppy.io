import ParalaxObject from "../../core/legacy/ParalaxObject";
import * as PIXI from "pixi.js";

class Roof extends ParalaxObject {
  constructor(props) {
    super(props);
    this.width = 2489;
    this.height = 1400;
    this.paralaxFactors = {
      x: 0.3,
      y: 0.9
    };
    this.offsets = {
      y: -50,
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
