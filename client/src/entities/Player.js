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

        graphics.beginFill(0xFFFF00, 0.1);
        graphics.lineStyle(5, 0xFF0000);
        graphics.drawCircle(this.x + 5, this.y + 5, 300);


        return graphics;
    }
}

export default Player;