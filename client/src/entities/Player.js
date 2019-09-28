import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Player extends GameObject {
    constructor({ isCurrentPlayer, ...params}) {
        super({...params});

        this.isCurrentPlayer = isCurrentPlayer;

        if (this.isCurrentPlayer) {
            this.camera.setTarget(this);
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
            graphics.drawCircle(5, 5, 300);
        }

        return graphics;
    }

    update(dt, updates) {
        super.update(dt, updates);
    }
}

export default Player;