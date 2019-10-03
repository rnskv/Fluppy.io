import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Player extends GameObject {
    constructor({ isCurrentPlayer, viewRadius, ...params}) {
        super({...params});

        this.isCurrentPlayer = isCurrentPlayer;
        this.viewRadius = viewRadius;

        if (this.isCurrentPlayer) {
            this.controller.camera.setTarget(this);
        }
    }

    createObject() {
        const container = new PIXI.Container();

        const graphics = new PIXI.Graphics();
        // const colors = [0xFF0000, 0x00FF00, 0xFFFFFF];
        // graphics.beginFill(colors[Math.floor(Math.random() * colors.length)]);
        // graphics.lineStyle(4, 0x000000);
        // graphics.drawRect(0, 0, this.width, this.height);


        const textures = [PIXI.Texture.from('/resources/images/player.png')];

        const sprite = new PIXI.Sprite(textures[0]);

        sprite.width = this.width + 20;
        sprite.height = this.height + 10;
        sprite.x = -10;
        sprite.y = -5;
        container.addChild(sprite);

        // if (this.isCurrentPlayer) {
        //     graphics.beginFill(0x000000, 0.0);
        //     graphics.lineStyle(1, 0x000000);
        //     graphics.drawCircle(1, 1, this.viewRadius);
        //
        //     graphics.beginFill(0xffffff, 0.1);
        //     graphics.lineStyle(1, 0xffffff);
        //     graphics.drawCircle(this.width / 2, this.height / 2, 30);
        //
        // }

        // container.addChild(graphics);

        return container
    }
}

export default Player;