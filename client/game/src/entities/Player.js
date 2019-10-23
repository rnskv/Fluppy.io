import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Player extends GameObject {
  constructor({ localScores, isCurrentPlayer, viewRadius, uid, name, ...params }) {
    super({ ...params });
    this.uid = uid;
    this.name = name;
    this.isCurrentPlayer = isCurrentPlayer;
    this.viewRadius = viewRadius;
    this.localScores = localScores;

    if (this.isCurrentPlayer) {
      this.controller.camera.setTarget(this);
    }
  }

  get title() {
    return `${this.name} - ${this.localScores}`;
  }

  createObject() {
    const container = new PIXI.Container();
    const graphics = new PIXI.Graphics();

    let sprite = PIXI.Sprite.from('/resources/images/player.png');
    sprite.width = this.radius * 2;
    sprite.height = this.radius * 2;
    sprite.anchor.set(0.5);

    // graphics.beginFill(0x000000, 1);
    // graphics.lineStyle(3, 0x000000);
    // graphics.drawCircle(0, 0, this.radius);

    graphics.beginFill(0x000000, 1);
    graphics.drawCircle(this.radius * 0.5, this.radius * 0.05, 2);

    graphics.beginFill(0xffffff, 1);
    graphics.lineStyle(1, 0x000000);
    graphics.drawCircle(this.radius * 0.55, this.radius * 0.03, 3);

    // if (this.isCurrentPlayer && this.x < 500) {
    //     graphics.beginFill(0x000000, 0.0);
    //     graphics.lineStyle(1, 0x000000);
    //     graphics.drawCircle(0, 0, this.viewRadius);
    //
    //     graphics.beginFill(0xffffff, 0.1);
    //     graphics.lineStyle(1, 0xffffff);
    //     graphics.drawCircle(0, 0, 70);
    // }



    container.addChild(sprite);
    container.addChild(graphics);
    return container;
  }

  createStaticObject() {
    const text = new PIXI.Text(this.title, {
      fontFamily: "Arial",
      fontSize: 17,
      fontWeight: 'bold',
      fill: 0x000000,
      align: "center",
      stroke: 0xffffff,
      strokeThickness: 3
    });
    text.position.y = this.radius + 10;
    text.position.x = 0;
    text.resolution = 2;
    text.anchor = new PIXI.Point(0.5, 0);

    return text;
  }


  update(dt, updates) {
    super.update(dt, updates);
    this.staticObject.text = this.title
  }
}

export default Player;
