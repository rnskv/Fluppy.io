import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Player extends GameObject {
    constructor({ isCurrentPlayer, viewRadius, ...params}) {
        super({...params});

        this.isCurrentPlayer = isCurrentPlayer;
        this.viewRadius = viewRadius;

        if (this.isCurrentPlayer) {
            this.controller.camera.setTarget(this);
        }
    }

    createObject() {
        const graphics = new PIXI.Graphics();
        const colors = [0xFF0000, 0x00FF00, 0xFFFFFF];
        graphics.beginFill(colors[Math.floor(Math.random() * colors.length)]);
        graphics.lineStyle(2, 0x00FF00);
        graphics.drawRect(0, 0, 10, 10);

        if (this.isCurrentPlayer) {
            graphics.beginFill(0xFFFF00, 0.1);
            graphics.lineStyle(5, 0xFFFFFF);
            graphics.drawCircle(5, 5, this.viewRadius);
        }

        return graphics;
    }
}

export default Player;