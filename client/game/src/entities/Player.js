import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

import itemsConfig from 'shared/configs/items.json';

class Player extends GameObject {
  constructor({ totalScores, localScores, isCurrentPlayer, viewRadius, uid, name, skin, ...params }) {
    super({ ...params });
    this.uid = uid;
    this.name = name;
    this.isCurrentPlayer = isCurrentPlayer;
    this.viewRadius = viewRadius;
    this.localScores = localScores;
    this.totalScores = totalScores;
    this.skin = skin;
    this.totalScoresNode = {};
    this.titleNode = {};
    if (this.isCurrentPlayer) {
      // this.controller.camera.setTarget(this);
    }
  }

  get title() {
    return `${this.name} - ${this.localScores}`;
  }

  createObject() {
    const container = new PIXI.Container();
    const graphics = new PIXI.Graphics();
    const skin = itemsConfig[this.skin]['resource'];
    console.log(skin)
    let sprite = new PIXI.Sprite(this.controller.stores.main.get('resources')[skin].texture);
    // let sprite = new PIXI.Sprite(this.controller.stores.main.get('resources')[skins[4]].texture);

    sprite.width = this.radius * 2 + this.radius;
    sprite.height = this.radius * 2 + this.radius;
    sprite.anchor.set(0.5);

    // graphics.beginFill(0x000000, 1);
    // graphics.lineStyle(3, 0x000000);
    // graphics.drawCircle(0, 0, this.radius);
    //
    // graphics.beginFill(0x000000, 1);
    // graphics.drawCircle(this.radius * 0.5, this.radius * 0.05, 2);
    //
    // graphics.beginFill(0xffffff, 1);
    // graphics.lineStyle(1, 0x000000);
    // graphics.drawCircle(this.radius * 0.55, this.radius * 0.03, 3);

    // if (this.isCurrentPlayer && this.x < 500) {
    //     graphics.beginFill(0x000000, 0.0);
    //     graphics.lineStyle(1, 0x000000);
    //     graphics.drawCircle(0, 0, this.viewRadius);
    //
    //     graphics.beginFill(0xffffff, 0.1);
    //     graphics.lineStyle(1, 0xffffff);
    //     graphics.drawCircle(0, 0, 70);
    // }

    if (this.isCurrentPlayer) {
      this.controller.camera.setTarget(this);
    }

    container.addChild(sprite);
    container.addChild(graphics);
    return container;
  }

  createStaticObject() {
    const container = new PIXI.Container();

    const title = new PIXI.Text(this.title, {
      fontFamily: "Arial",
      fontSize: 17,
      fontWeight: 'bold',
      fill: 0x000000,
      align: "center",
      stroke: 0xffffff,
      strokeThickness: 3
    });
    title.position.y = this.radius + 10;
    title.position.x = 0;
    title.resolution = 2;
    title.anchor = new PIXI.Point(0.5, 0);

    container.addChild(title);

    const totalScores = new PIXI.Text(this.totalScores, {
      fontFamily: "Arial",
      fontSize: 17,
      fontWeight: 'bold',
      fill: 0x000000,
      align: "center",
      stroke: 0xffffff,
      strokeThickness: 3
    });

    totalScores.position.y = -this.radius - 15 ;
    totalScores.position.x = 0;
    totalScores.resolution = 2;
    totalScores.anchor = new PIXI.Point(0.5, 0.5);

    this.totalScoresNode = totalScores;
    this.titleNode = title;

    container.addChild(totalScores);

    return container;
  }


  update(dt, updates) {
    super.update(dt, updates);

    this.totalScoresNode.text = this.totalScores;
    this.titleNode.text = this.title;
  }
}

export default Player;
