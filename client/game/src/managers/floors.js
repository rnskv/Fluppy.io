import ParalaxManager from "../core/ParalaxManager";

class FloorsManager extends ParalaxManager {
  constructor({ ...params }) {
    super({ ...params });
    this.isEnvironment = true;
    this.paralaxFactor = 1;
    this.gluingOffset = 100;
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

  selector(objectData) {
    return {
      controller: this.controller,
      x: objectData.x,
      y: objectData.y
    };
  }
}

export default FloorsManager;
