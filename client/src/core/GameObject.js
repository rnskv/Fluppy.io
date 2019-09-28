import * as PIXI from 'pixi.js';

export default class GameObject {
    constructor({ stage, camera, id, x, y, width, height, methods }) {
        if (!id) {
            throw new Error('GameObject must have id')
        }
        this.stage = stage;
        this.camera = camera;
        this.id = id;
        this.x = new Number(x);
        this.y = y;
        this.width = width || 10;
        this.height = height || 10;
        this.rotation = 0;
        this.object = null;
        this.methods = methods || {}
    }

    createObject() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.drawRect(0, 0, 10, 10);
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

    hide() {
        this.object.visible = false;
    }

    show() {
        this.object.visible = true;
    }

    update(dt, updates) {
        if (!updates) return;
        Object.keys(updates).forEach(param => {
            this[param] = updates[param];
        });

        this.object.transform.position.x = this.x - this.camera.position.x;
        this.object.transform.position.y = this.y - this.camera.position.y;
        this.object.transform.position.y = this.y - this.camera.position.y;

        this.object.transform.rotation = this.rotation;
        this.object.pivot = { x: 5, y: 5 }
    }
}