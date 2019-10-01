import EnvironmentObject from "../core/EnvironmentObject";
import * as PIXI from "pixi.js";

class Silhouette extends EnvironmentObject {
    constructor({...params}) {
        super(params);
        this.width = 1300;
        this.height = 300;
        this.offsets = {
            x: 0,
            y: -400
        }
    }

    createObject() {
        const textures = [PIXI.Texture.from('01_front_silhouette.png')];

        const sprite = new PIXI.Sprite(textures[0]);

        sprite.width = this.width;
        sprite.height = this.height;

        return sprite;
    }

    update(dt) {
        this.object.transform.position.x =  Math.floor(this.x +  this.controller.camera.position.x * this.paralaxFactors.x);
        this.object.transform.position.y =  Math.floor(this.y +  this.controller.camera.position.y * this.paralaxFactors.y);
    }
}

export default Silhouette;
