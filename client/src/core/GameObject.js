import * as PIXI from 'pixi.js';

export default class GameObject {
    constructor({ stage, camera, id, x, y }) {
        if (!id) {
            throw new Error('GameObject must have id')
        }
        this.stage = stage;
        this.camera = camera;
        this.id = id;
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.object = null;
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

        console.log('camera', this.camera);

        Object.keys(updates).forEach(param => {
            this[param] = updates[param];
        });

        this.object.transform.position.x = this.x - this.camera.position.x + 1280 / 2;
        this.object.transform.position.y = this.y - this.camera.position.y + 600 / 2;

        // this.object.transform.rotation = this.rotation;
        this.object.pivot = { x: 5, y: 5 }
    }
}