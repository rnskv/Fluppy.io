import ParalaxObject from "../core/legacy/ParalaxObject";
import * as PIXI from "pixi.js";

class BgLayer4 extends ParalaxObject {
  constructor(props) {
    super(props);
    this.width = 1920;
    this.height = 1080;
  }

  createObject() {
    const container = new PIXI.Container();
    console.log(this.controller.stores.main.get('resources'))
    let sprite = new PIXI.Sprite(this.controller.stores.main.get('resources').Foreground.texture);
    sprite.width = this.width;
    sprite.height = this.height;
    container.addChild(sprite);
    return container;
  }
}

export default BgLayer4;
