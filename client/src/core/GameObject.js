import * as PIXI from 'pixi.js';

export default class GameObject {
    constructor({ id, x, y, width, height, methods, controller }) {
        if (!id) {
            throw new Error('GameObject must have id')
        }
        this.controller = controller;
        this.id = id;
        this.x = x;
        this.y = y;
        this.offsets = {
            x: 0,
            y: 0
        };
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
        this.controller.stage.addChild(this.object)
    }

    removeFromStage() {
        this.controller.stage.removeChild(this.object)
    }

    hide() {
        this.object.visible = false;
    }

    show() {
        this.object.visible = true;
    }

    setUpdates(updates) {
        Object.keys(updates).forEach(param => {
            this[param] = updates[param];
        });
    }

    runUpdates() {
        this.object.transform.position.x = this.x + this.offsets.x - this.controller.camera.position.x;
        this.object.transform.position.y = this.y + this.offsets.y - this.controller.camera.position.y;

        this.object.transform.rotation = this.rotation;
    }

    update(dt, updates) {
        if (!updates) return;
        this.setUpdates(updates);
        this.runUpdates();
    }
}