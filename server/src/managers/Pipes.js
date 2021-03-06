import Manager from "../core/Manager";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

class PipesManager extends Manager {
  constructor({ ...params }) {
    super({ ...params });
    this.preset = [{ x: 400, y: -99999 }, { x: 400, y: 99999 }];
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

    let wholeSize = getRandomInt(130, 180);
    let shift = getRandomInt(-250, 250);

    switch (true) {
      case lastPosition < 1500: {
        wholeSize *= 1.7;
        break;
      }

      case lastPosition < 2000: {
        wholeSize *= 1.5;
        break;
      }

      case lastPosition < 3000: {
        wholeSize *= 1.2;
        break;
      }

      case lastPosition < 5000: {
        wholeSize *= 1;
        break;
      }

      case lastPosition < 7000: {
        wholeSize *= 0.9;
        break;
      }

      case lastPosition < 12000: {
        wholeSize *= 0.8;
        break;
      }
    }

    const topPipe = this.addObject({
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

    this.controller.managers.checkpoints.spawnCheckPoint(
      lastPosition + this.gapDistance + topPipe.width / 2 - 10,
      topPipe.y + topPipe.height,
      wholeSize
    );
  }
}

export default PipesManager;
