import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Pipe extends GameObject {
  createObject() {
    const container = new PIXI.Container();
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, this.width, this.height);

    container.addChild(graphics);

    return container;
  }
}

export default Pipe;
