import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Pipe extends GameObject {
  constructor(params) {
    super(params);
  }

  createObject() {
    const container = new PIXI.Container();

    // const textures = [PIXI.Texture.from('/resources/images/pipe.png')];
    //
    // const sprite = new PIXI.Sprite(textures[0]);
    //
    // sprite.width = this.width;
    // sprite.height = this.height;

    const graphics = new PIXI.Graphics();
    const colors = [0xff0000, 0x00ff00, 0xffffff];
    graphics.beginFill(colors[Math.floor(Math.random() * colors.length)]);
    graphics.lineStyle(4, 0x000000);
    graphics.drawRect(0, 0, this.width, this.height);

    container.addChild(graphics);

    return container;
  }
}

export default Pipe;
