import EnvironmentObject from "../core/EnvironmentObject";
import * as PIXI from "pixi.js";

class Floor extends EnvironmentObject {
  constructor(props) {
    super(props);
    this.width = 400;
    this.height = 800;
  }

  createObject() {
    const container = new PIXI.Container();
    const graphics = new PIXI.Graphics();
    const colors = [0xff0000, 0x00ff00, 0xffffff];
    graphics.beginFill(colors[Math.floor(Math.random() * colors.length)]);
    graphics.lineStyle(4, 0x000000);
    graphics.drawRect(0, 0, this.width, this.height);

    container.addChild(graphics);

    return container;
  }
}

export default Floor;
