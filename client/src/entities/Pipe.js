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
        graphics.drawRect(0, 0, this.width, this.height);
        return graphics;
    }
}

export default Pipe;