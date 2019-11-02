import * as PIXI from "pixi.js";

export default class GameObject {
  constructor({
    container,
    id,
    x,
    y,
    radius,
    width,
    height,
    pivot,
    methods,
    controller,
    shape
  }) {
    if (!container) {
      throw new Error("GameObject must have container");
    }

    if (!id) {
      throw new Error("GameObject must have id");
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
    this.pivot = pivot || { x: 0, y: 0 };
    this.objectContainer = null;

    this.methods = methods || {};
    this.shape = shape;
  }

  drawShape(object) {
    const graphics = new PIXI.Graphics();

    graphics.beginFill("#FFFFFF");
    graphics.lineStyle(4, 0x000000);
    graphics.drawRect(
      this.shape.x,
      this.shape.y,
      this.shape.width,
      this.shape.height
    );

    object.addChild(graphics);
    // return graphics;
  }

  createObject() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffff00);
    graphics.drawRect(0, 0, 10, 10);
    return graphics;
  }

  createStaticObject() {
    /* */
  }

  addToStage() {
    //Для примера

    this.objectContainer = new PIXI.Container();
    this.staticObject = this.createStaticObject();
    this.activeObject = this.createObject();

    this.objectContainer.addChild(this.activeObject);
    if (this.staticObject) {
      this.objectContainer.addChild(this.staticObject);
    }

    this.container.addChild(this.objectContainer);

    this.runUpdates();
  }

  removeFromStage() {
    this.container.removeChild(this.objectContainer);
  }

  hide() {
    this.objectContainer.visible = false;
  }

  show() {
    this.objectContainer.visible = true;
  }

  setUpdates(updates) {
    Object.keys(updates).forEach(param => {
      this[param] = updates[param];
    });
  }

  runUpdates() {
    const { camera } = this.controller;

    this.objectContainer.transform.position.x =
      (this.x + this.offsets.x) * camera.zoom - camera.position.x;
    this.objectContainer.transform.position.y =
      (this.y + this.offsets.y) * camera.zoom - camera.position.y;

    this.objectContainer.pivot = this.pivot;

    this.objectContainer.scale = new PIXI.Point(
      camera.zoom,
      camera.zoom
    );

    this.activeObject.transform.rotation = this.rotation;
  }

  update(dt, updates, syncCamera) {
    if (!updates) return;
    this.setUpdates(updates);
    this.runUpdates(syncCamera);
  }
}
