import Manager from "./Manager";

class ParalaxManager extends Manager {
  constructor({ ...params }) {
    super(params);
    this.paralaxFactor = 1;
  }

  getActiveObjects(updates) {
    return this.objects.values.filter(
      object => object.x + object.width > this.controller.camera.x - this.controller.camera.size.width
    );
  }

  getNewPartPosition() {
    const settings = this.controller.stores.main.get("settings");

    return {
      x: this.objects.last.x + this.objects.last.width - this.gluingOffset,
      y: settings.map.border.bottom
    };
  }

  getFirstPartPosition() {
    const settings = this.controller.stores.main.get("settings");

    return {
      x: 0,
      y: settings.map.border.bottom
    };
  }

  get isFirstPart() {
    return !this.objects.last;
  }

  addPart() {
    const settings = this.controller.stores.main.get("settings");
    const { controller, isFirstPart } = this;
    if (!controller.stores.main.get('settings')) return;
    const leftViewportPoint = controller.camera.position.x + controller.camera.size.width / 2 + controller.stores.main.get('settings').viewRadius;

    const leftPartPoint = this.objects.last
      ? this.objects.last.x
      : 0 ;

    const isNeedAddNewPart = leftViewportPoint > leftPartPoint;

    if (settings) {
      if (isFirstPart) {
        this.addObject(this.getFirstPartPosition());
      }

      if (isNeedAddNewPart) {
        this.addObject(this.getNewPartPosition());
      }
    }
  }

  update(dt, updates) {
    this.addPart();
    super.update(dt, updates);
  }
}

export default ParalaxManager;
