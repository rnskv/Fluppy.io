import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";
/* @todo Наведи здесь порядок */
class Pipe extends GameObject {
  constructor({position, ...params}) {
    super({...params});

    this.position = position;
  }
  createObject() {
    const container = new PIXI.Container();

    const koef = this.width / 200;

    if (this.position !== 'bottom') {
      let currentY = 0;
      while (currentY < this.height - 368 * koef) {
        const newPipe = PIXI.Sprite.from('/resources/images/pipe.png')
        newPipe.y = currentY;
        newPipe.width = this.width;
        newPipe.height = 1 * koef;
        container.addChild(newPipe);

        currentY += 1 * koef;
      }

      const pipeTop = PIXI.Sprite.from('/resources/images/pipe_end.png')
      pipeTop.y = currentY;
      pipeTop.x = this.width;
      pipeTop.width = this.width;
      pipeTop.height = 368 * koef;
      pipeTop.anchor = new PIXI.Point(1, 1);
      pipeTop.scale.x *= -1;
      pipeTop.rotation = Math.PI * 180 / 180;
      container.addChild(pipeTop);
    } else {
      let currentY = 0;
      const pipeTop = PIXI.Sprite.from('/resources/images/pipe_end.png')
      pipeTop.y = currentY;
      pipeTop.x = 0;
      pipeTop.width = this.width;
      pipeTop.height = 368 * koef;
      pipeTop.anchor = new PIXI.Point(0, 0);
      // pipeTop.scale.x *= -1
      container.addChild(pipeTop);
      currentY = 368 * koef;
      while (currentY < this.height) {
        const newPipe = PIXI.Sprite.from('/resources/images/pipe.png')
        newPipe.y = currentY;
        newPipe.width = this.width;
        newPipe.height = 1 * koef;
        container.addChild(newPipe);

        currentY += 1 * koef;
      }
    }

    const canvas  = this.controller.app.renderer.plugins.extract.canvas(container);
    const sprite =  PIXI.Sprite.from(canvas);
    // sprite.x = this.x;
    // sprite.y = this.y;
    // sprite.width = this.width;
    // sprite.height = this.height
    return sprite
  }
}

export default Pipe;
