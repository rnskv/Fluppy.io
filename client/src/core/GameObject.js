import * as PIXI from 'pixi.js';

export default class GameObject {
    constructor({ stage, id, x, y }) {
        this.stage = stage;
        this.id = id;
        this.x = x;
        this.y = y;

        this.object = null;
    }

    createObject() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.lineStyle(5, 0xFF0000);
        graphics.drawRect(this.x, this.y, 10, 10);
        return graphics;
    }

    addToStage() {
        //Для примера
        this.object = this.createObject();
        this.stage.addChild(this.object)
    }

    removeFromStage() {
        this.stage.removeChild(this.object)
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