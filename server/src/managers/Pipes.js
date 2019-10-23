import Manager from "../core/Manager";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

class PipesManager extends Manager {
  constructor({ ...params }) {
    super({ ...params });
    this.preset = [{ x: 500, y: -99999 }, { x: 500, y: 99999 }];
    this.gapDistance = 400;
  }

  init(controller) {
    super.init(controller);

    for (let data of this.preset) {
      this.addObject(data);
    }

    controller.collider.addCollisionManager("pipes", this);
  }

  selector(objectParams) {
    return {
      id: objectParams.id,
      x: objectParams.x,
      y: objectParams.y,
      width: objectParams.width,
      height: objectParams.height,
      position: objectParams.position,
      shift: objectParams.shift,
      wholeSize: objectParams.wholeSize
    };
  }

  spawnPipes() {
    const lastPosition = this.objects.last ? this.objects.last.x : 0;

    const wholeSize = getRandomInt(130, 180);
    const shift = getRandomInt(-250, 250);

    this.addObject({
      id: this.objects.uniqueId,
      x: lastPosition + this.gapDistance,
      position: "top",
      shift: shift,
      wholeSize
    });

    this.addObject({
      id: this.objects.uniqueId,
      x: lastPosition + this.gapDistance,
      position: "bottom",
      shift: shift,
      wholeSize
    });
  }
}

export default PipesManager;
