import * as PIXI from "pixi.js";
import ObjectPool from "shared/core/ObjectsPool";

class Manager {
  constructor({ entity }) {
    this.objects = new ObjectPool({ type: "OBJECTS" });

    this.actives = new ObjectPool({ type: "ACTIVES" });
    this.isEnvironment = false;
    this.entity = entity;
    this.controller = null;
    this.container = new PIXI.Container();
    this.update = this.update.bind(this);
  }

  init() {
    this.controller.stage.addChild(this.container);
  }

  connectController(controller) {
    this.controller = controller;
  }

  moveToActives(id) {
    const object = this.objects.getById(id);
    if (!object) return;
    if (this.actives.add(id, object)) {
      object.show();
    }
  }

  clearActives() {
    this.actives.values.forEach(object => object.hide());
    this.actives.reset();
  }

  selector(objectData) {
    return {
      id: objectData.id
    };
  }

  addObject(objectData) {
    const data = this.selector(objectData);

    if (this.isEnvironment) {
      data.id = this.objects.uniqueId;
    }

    if (!this.objects.isExist(data.id)) {
      const entity = new this.entity({
        ...data,
        container: this.container
      });

      if (this.objects.add(data.id, entity)) {
        entity.addToStage();
      }

      return entity;
    } else {
      throw new Error(`Object id isn't unique`);
    }
  }

  removeObject(id) {
    if (!this.objects.isExist(id)) return;
    const object = this.objects.getById(id);
    if (this.objects.remove(id)) {
      object.removeFromStage();
    }
  }

  getActiveObjects(updates) {
    return Object.values(updates);
  }

  update(dt, updates) {
    this.clearActives();
    this.getActiveObjects(updates).forEach(data => {
      this.moveToActives(data.id);
      if (this.objects.isExist(data.id)) {
        this.objects.getById(data.id).update(dt, data);
      } else {
        this.addObject(data).update(dt, data);
      }
    });
  }
}

export default Manager;
