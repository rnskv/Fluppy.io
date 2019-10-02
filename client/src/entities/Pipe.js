import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Pipe extends GameObject {
    constructor(params) {
        super(params);
    }

    createObject() {
        const container = new PIXI.Container();

        const textures = [PIXI.Texture.from('/resources/images/pipe.png')];

        const sprite = new PIXI.Sprite(textures[0]);

        sprite.width = 100;
        sprite.height = this.height;
        container.addChild(sprite);

        return container;
    }
}

export default Pipe;