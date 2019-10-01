import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Pipe extends GameObject {
    constructor(params) {
        super(params);
    }

    createObject() {
        const container = new PIXI.Container();

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x00FF00);
        graphics.lineStyle(5, 0xFF00FF);
        graphics.drawRect(49, 0, 2,  this.height);
        container.addChild(graphics)

        const textures = [PIXI.Texture.from('spike_box.png')];

        const sprite = new PIXI.Sprite(textures[0]);

        sprite.width = 100;
        sprite.height = 100;

        container.addChild(sprite);

        const bottomSprite = new PIXI.Sprite(textures[0]);

        bottomSprite.width = 100;
        bottomSprite.height = 100;

        bottomSprite.y = this.height - 100;

        container.addChild(bottomSprite);


        return container;
    }
}

export default Pipe;