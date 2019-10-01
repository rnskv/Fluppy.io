import ParalaxObject from "../core/ParalaxObject";
import * as PIXI from "pixi.js";

class Forest extends ParalaxObject {
    constructor(params) {
        super(params);
        this.width = 1300;
        this.height = 1300;
        this.offsets = {
            x: 0,
            y: 100
        }
    }

    createObject() {
        const textures = [PIXI.Texture.from('05_far_BG.jpg')];

        const sprite = new PIXI.Sprite(textures[0]);

        sprite.width = this.width;
        sprite.height = this.height;

        return sprite;
    }
}

export default Forest;
