import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class CheckPoint extends GameObject {
  constructor({...params}) {
    super({...params})
    this.padding = 40;
  }

  createObject() {
    const container = new PIXI.Container();
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x00ff00);
    graphics.drawRect(0, this.padding / 2, this.width, this.height - this.padding);

    container.addChild(graphics);

    return container;
  }
}

export default CheckPoint;
