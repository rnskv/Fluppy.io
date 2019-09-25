import GameObject from "../core/GameObject";
import * as PIXI from "pixi.js";

class Player extends GameObject {
    constructor({ isCurrentPlayer, ...params}) {
        super({...params});

        this.isCurrentPlayer = isCurrentPlayer

        if (this.isCurrentPlayer) {
            this.camera.setTarget(this);
        }
    }

    createObject() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.lineStyle(5, 0xFF0000);
        graphics.drawRect(0, 0, 10, 10);

        if (this.isCurrentPlayer) {
            graphics.beginFill(0xFFFF00, 0.1);
            graphics.lineStyle(5, 0xFF0000);
            graphics.drawCircle(5, 5, 300);
        }

        return graphics;
    }

    update(dt, updates) {
        super.update(dt, updates);
    }
}

export default Player;