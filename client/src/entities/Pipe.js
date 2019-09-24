import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Pipe extends GameObject {
    constructor(params) {
        super(params);
    }

    createObject() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x00FF00);
        graphics.lineStyle(5, 0xFF00FF);
        graphics.drawRect(this.x, this.y, 10, 10);
        return graphics;
    }
}

export default Pipe;