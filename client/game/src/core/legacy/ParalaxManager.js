import Manager from "../Manager";

class ParalaxManager extends Manager {
  constructor({ startPosition, paralaxFactors, ...params }) {
    super(params);
    this.isEnvironment = true;
    this.startPosition = startPosition || {x: 0, y: 0};
    this.paralaxFactors = paralaxFactors || {x: 1, y: 1}
  }

  getActiveObjects() {
    return this.objects.values.filter(
      object =>
        (object.x * this.paralaxFactors.x + object.width) * this.controller.camera.zoom > this.controller.camera.position.x  &&
        object.x * this.paralaxFactors.x * this.controller.camera.zoom < this.controller.camera.position.x + this.controller.camera.size.width
    );
  }

  objectIsActive(object) {
    return (object.x * this.paralaxFactors.x + object.width) * this.controller.camera.zoom > this.controller.camera.position.x  &&
      object.x * this.paralaxFactors.x * this.controller.camera.zoom < this.controller.camera.position.x + this.controller.camera.size.width
  }

  getNewPartPosition() {
    const settings = this.controller.stores.main.get("settings");
    return {
      x: this.objects.last.x + this.objects.last.width / this.paralaxFactors.x,
      y: this.startPosition.y
    };
  }

  getFirstPartPosition() {
    const settings = this.controller.stores.main.get("settings");

    return {
      x: this.startPosition.x,
      y: this.startPosition.y
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

  update(dt, updates, syncCamera) {
    this.addPart();
    this.objects.values.forEach(object => {
      object.update(dt, {}, syncCamera);
    });
  }

  selector(objectData) {
    return {
      controller: this.controller,
      paralaxFactors: this.paralaxFactors,
      x: objectData.x,
      y: objectData.y
    };
  }
}

export default ParalaxManager;
