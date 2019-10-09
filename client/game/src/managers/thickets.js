import ParalaxManager from "../core/ParalaxManager";

class ThicketsManager extends ParalaxManager {
  constructor({ ...params }) {
    super({ ...params });
    this.isEnvironment = true;
    this.gluingOffset = 10;

    this.paralaxFactors = {
      x: -0.4,
      y: -0.8
    };
  }

  getNewPartPosition() {
    const settings = this.controller.stores.main.get("settings");
    const lastPart = this.objects.last;

    return {
      x: lastPart.x + lastPart.width - this.gluingOffset,
      y: settings.map.border.bottom - 200
    };
  }

  getFirstPartPosition() {
    const settings = this.controller.stores.main.get("settings");

    return {
      x: 0,
      y: settings.map.border.bottom - 200
    };
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

export default ThicketsManager;
