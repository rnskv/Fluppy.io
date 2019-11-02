import EnvironmentObject from "../../core/legacy/EnvironmentObject";
import * as PIXI from "pixi.js";

class Roof extends EnvironmentObject {
  constructor(props) {
    super(props);
    this.width = 400;
    this.height = 800;
  }

  createObject() {
    const container = new PIXI.Container();
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, this.width, this.height);
    container.addChild(graphics);

    return container;
  }
}

export default Roof;
