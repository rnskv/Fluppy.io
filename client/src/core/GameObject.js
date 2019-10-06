import * as PIXI from 'pixi.js';

export default class GameObject {
    constructor({ container, id, x, y, radius, width, height, pivot, methods, controller, shape }) {
        if (!container) {
            throw new Error('GameObject must have container')
        }

        if (!id) {
            throw new Error('GameObject must have id')
        }
        this.container = container;
        this.controller = controller;
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.offsets = {
            x: 0,
            y: 0
        };

        this.width = width || 10;
        this.height = height || 10;
        this.rotation = 0;
        this.pivot = pivot || {x: 0, y: 0};
        this.object = null;
        this.methods = methods || {};
        this.shape = shape;
    }

    drawShape(object) {
        const graphics = new PIXI.Graphics();

        graphics.beginFill('#FFFFFF');
        graphics.lineStyle(4, 0x000000);
        graphics.drawRect(this.shape.x, this.shape.y, this.shape.width, this.shape.height);

        object.addChild(graphics);
        // return graphics;
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
        this.container.addChild(this.object);
        if (this.shape) {
            this.drawShape(this.object);
        }
    }

    removeFromStage() {
        this.container.removeChild(this.object)
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
        this.object.pivot = this.pivot;
    }

    update(dt, updates) {
        if (!updates) return;
        this.setUpdates(updates);
        this.runUpdates();
    }
}