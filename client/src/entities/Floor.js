import EnvironmentObject from "../core/EnvironmentObject";
import * as PIXI from "pixi.js";

class Floor extends EnvironmentObject {
    constructor(params) {
        super(params);
        this.width = 100;
        this.height = 10;
    }

    createObject() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x00FF00);
        graphics.lineStyle(5, 0xFF00FF);
        graphics.drawRect(0, 0, this.width, this.height);
        return graphics;
    }
}

export default Floor;