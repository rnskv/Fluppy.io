import Manager from "../Manager";

class ParalaxManager extends Manager {
  constructor({ startPosition, paralaxFactors, ...params }) {
    super(params);
    this.isEnvironment = true;
    this.startPosition = startPosition;
    this.paralaxFactors = paralaxFactors
  }

  getActiveObjects() {
    return this.objects.values.filter(
      object => true
    );
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

  update(dt, updates) {
    this.addPart();
    super.update(dt, updates);
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
