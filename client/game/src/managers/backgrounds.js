import ParalaxManager from "../core/ParalaxManager";

class BackgroundsManager extends ParalaxManager {
  constructor({ ...params }) {
    super({ ...params });
    this.isEnvironment = true;
  }

  getNewPartPosition() {
    const settings = this.controller.stores.main.get("settings");

    return {
      x: this.objects.last.x + this.objects.last.width,
      y: settings.map.border.top
    };
  }

  getFirstPartPosition() {
    const settings = this.controller.stores.main.get("settings");

    return {
      x: 0,
      y: settings.map.border.top
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

export default BackgroundsManager;
