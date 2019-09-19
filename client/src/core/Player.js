import * as PIXI from 'pixi.js';

export default class Player {
    constructor({ stage, id, x, y }) {
        this.stage = stage;
        this.id = id;
        this.x = x;
        this.y = y;

        this.object = null;

        this.addToStage();
    }

    addToStage() {
        //Для примера
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.lineStyle(5, 0xFF0000);
        graphics.drawRect(this.x, this.y, 10, 10);

        this.object = graphics;

        this.stage.addChild(graphics)
    }

    update(dt, updates) {
        if (!updates) return;

        Object.keys(updates).forEach(param => {
            this[param] = updates[param];
        });

        this.object.transform.position.x = this.x;
        this.object.transform.position.y = this.y;
    }
}