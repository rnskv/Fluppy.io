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
        graphics.drawRect(0, 0, 10, 10);

        graphics.beginFill(0xFFFF00, 0.1);
        graphics.lineStyle(5, 0xFF0000);
        graphics.drawCircle(5, 5, 300);


        return graphics;
    }
}

export default Player;