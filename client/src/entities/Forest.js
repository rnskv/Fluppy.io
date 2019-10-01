import EnvironmentObject from "../core/EnvironmentObject";
import * as PIXI from "pixi.js";

class Forest extends EnvironmentObject {
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

    update(dt) {
        this.object.transform.position.x =  Math.floor(this.x +  this.controller.camera.position.x * -0.3);
        this.object.transform.position.y =  Math.floor(this.y +  this.controller.camera.position.y * -0.9);
    }
}

export default Forest;