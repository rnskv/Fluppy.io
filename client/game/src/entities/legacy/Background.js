import ParalaxObject from "../../core/legacy/ParalaxObject";
import * as PIXI from "pixi.js";

class Background extends ParalaxObject {
  constructor(props) {
    super(props);
    this.width = 2489;
    this.height = 1400;
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

export default Background;
