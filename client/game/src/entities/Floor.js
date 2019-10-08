import EnvironmentObject from "../core/EnvironmentObject";
import * as PIXI from "pixi.js";

class Floor extends EnvironmentObject {
    constructor(params) {
        super(params);
        this.width = 800;
        this.height = 160;
        this.offsets = {
            x: 0,
            y: -40
        }
    }

    createObject() {
        const textures = [PIXI.Texture.from('00_forest_floor.png')];

        const sprite = new PIXI.Sprite(textures[0]);

        sprite.width = this.width;
        sprite.height = this.height;

        return sprite;
    }
}

export default Floor;