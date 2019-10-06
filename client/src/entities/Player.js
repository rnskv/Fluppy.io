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
        const colors = [0xFF0000, 0x00FF00, 0xFFFFFF];
        graphics.beginFill(0x000000, 1);
        graphics.lineStyle(1, 0x000000);
        graphics.drawCircle(0, 0, this.radius);
        // const textures = [PIXI.Texture.from('/resources/images/player.png')];
        console.log(this);
        // const sprite = new PIXI.Sprite(textures[0]);
        //
        // sprite.width = this.width + 20;
        // sprite.height = this.height + 10;
        // sprite.x = -10;
        // sprite.y = -5;
        // container.addChild(sprite);

        if (this.isCurrentPlayer) {
            graphics.beginFill(0x000000, 0.0);
            graphics.lineStyle(1, 0x000000);
            graphics.drawCircle(0, 0, this.viewRadius);

            graphics.beginFill(0xffffff, 0.1);
            graphics.lineStyle(1, 0xffffff);
            graphics.drawCircle(0, 0, 30);
        }

        container.addChild(graphics);

        const text = new PIXI.Text(`${this.id.toString().slice(0, 5)}`,{fontFamily : 'Arial', fontSize: 14, fill : 0x0000, align : 'center'});
        container.addChild(text);
        text.position.y = 50;
        text.position.x = 0;
        text.anchor = new PIXI.Point(0.5, 1);
        return container
    }
}

export default Player;