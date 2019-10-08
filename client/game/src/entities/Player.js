import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Player extends GameObject {
  constructor({ isCurrentPlayer, viewRadius, uid, name, ...params }) {
    super({ ...params });
    this.uid = uid;
    this.name = name;
    this.isCurrentPlayer = isCurrentPlayer;
    this.viewRadius = viewRadius;

    if (this.isCurrentPlayer) {
      this.controller.camera.setTarget(this);
    }
  }

  createObject() {
    const container = new PIXI.Container();
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0x00ff00, 1);
    graphics.lineStyle(3, 0x000000);
    graphics.drawCircle(0, 0, this.radius);

    graphics.beginFill(0x000000, 1);
    graphics.lineStyle(1, 0x000000);
    graphics.drawCircle(this.radius * 0.5, this.radius * 0.05, 5);

    graphics.beginFill(0xffffff, 1);
    graphics.lineStyle(1, 0x000000);
    graphics.drawCircle(this.radius * 0.5, this.radius * 0.05, 3);

    // if (this.isCurrentPlayer && this.x < 500) {
    //     graphics.beginFill(0x000000, 0.0);
    //     graphics.lineStyle(1, 0x000000);
    //     graphics.drawCircle(0, 0, this.viewRadius);
    //
    //     graphics.beginFill(0xffffff, 0.1);
    //     graphics.lineStyle(1, 0xffffff);
    //     graphics.drawCircle(0, 0, 70);
    // }

    container.addChild(graphics);

    return container;
  }

  createStaticObject() {
    const text = new PIXI.Text(`${this.name}`, {
      fontFamily: "Roboto",
      fontSize: 16,
      fill: 0xffffff,
      align: "center",
      stroke: 0x000000,
      strokeThickness: 3
    });
    text.position.y = this.radius + 10;
    text.position.x = 0;
    text.anchor = new PIXI.Point(0.5, 0);

    return text;
  }
}

export default Player;
