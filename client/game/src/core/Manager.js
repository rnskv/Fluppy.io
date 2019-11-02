import * as PIXI from "pixi.js";
import ObjectPool from "shared/core/ObjectsPool";

class Manager {
  constructor({ entity, zIndex = 1}) {
    this.objects = new ObjectPool({ type: "OBJECTS" });
    this.actives = new ObjectPool({ type: "ACTIVES" });
    this.isEnvironment = false;

    this.entity = entity;
    this.controller = null;
    this.container = new PIXI.Container();
    this.zIndex = zIndex;
    this.update = this.update.bind(this);
  }

  init() {
    this.controller.stage.addChild(this.container);
    this.changeZIndex(this.zIndex);
  }

  unmount() {
    this.controller.stage.removeChild(this.container);
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

  changeZIndex(zIndex) {
    this.container.zIndex = zIndex;
    this.controller.stage.sortChildren();
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

  clearContainer() {
    // this.container = null;
    this.container.parent.removeChild(this.container);

    // this.container.destroy({children:true, texture:true, baseTexture:true});
  }

  update(dt, updates, syncCamera) {
    this.clearActives();
    this.getActiveObjects(updates).forEach(data => {
      this.moveToActives(data.id);
      if (this.actives.isExist(data.id)) {
        this.actives.getById(data.id).update(dt, data, syncCamera);
      } else {
        this.addObject(data).update(dt, data, syncCamera);
      }
    });
  }
}

export default Manager;
