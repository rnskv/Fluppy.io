import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Player extends GameObject {
    constructor(params) {
        super(params);
    }

    createObject() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.lineStyle(5, 0xFF0000);
        graphics.drawRect(this.x, this.y, 10, 10);
        return graphics;
    }
}

export default Player;