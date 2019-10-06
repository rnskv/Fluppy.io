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
        const container = new PIXI.Container();
        const graphics = new PIXI.Graphics();

        graphics.beginFill(0xFFFFFF, 1);
        graphics.lineStyle(1, 0x000000);
        graphics.drawCircle(0, 0, this.radius);

        // if (this.isCurrentPlayer && this.x < 500) {
        //     graphics.beginFill(0x000000, 0.0);
        //     graphics.lineStyle(1, 0x000000);
        //     graphics.drawCircle(0, 0, this.viewRadius);
        //
        //     graphics.beginFill(0xffffff, 0.1);
        //     graphics.lineStyle(1, 0xffffff);
        //     graphics.drawCircle(0, 0, 70);
        // }

        container.addChild(graphics);

        return container
    }

    createStaticObject() {
        console.log(this)
        const text = new PIXI.Text(`${this.id.toString().slice(0, 5)}`,{fontFamily : 'Arial', fontSize: 14, fill : 0x0000, align : 'center'});
        text.position.y = this.radius + 10;
        text.position.x = 0;
        text.anchor = new PIXI.Point(0.5, 0);

        return text;
    }
}

export default Player;