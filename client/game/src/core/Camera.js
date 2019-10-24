import * as PIXI from 'pixi.js';
import Interpolator from "../utils/interpolator";

class Camera {
  constructor({ size, settings }) {
    this.originWidth = size.width;
    this.x = 0;
    this.y = 0;
    this.target = null;
    this.size = size;
    this.zoom = 1;
    this.zoomSpeed = 100;
    this.destination = {
      x: 0,
      y: 0
    };

    this.settings = settings || {
      max: {
        top: 0,
        bottom: 1000 * this.zoom,
        left: 0
      }
    };

    window.document.addEventListener('mousewheel', (e) => {
      if (e.deltaY >= 0) {
        // up
        this.changeZoom(-e.deltaY / 512)
      } else {
        // down
        this.changeZoom( -e.deltaY / 512)
      }
    })
    //Сюда добавить отсутпы (120)
  }

  changeZoom(coef) {
    if (this.zoom + coef > 0.7 && this.zoom + coef < 2) {
      this.zoom += coef;
    }
  }

  get position() {
    if (this.target) {
      const x = (this.x * this.zoom - this.size.width / 2);
      const y = (this.y * this.zoom - this.size.height / 2);

      return {
        x: x < this.settings.max.left ? this.settings.max.left : x,
        y
      };
    }

    return {
      x: this.x * this.zoom,
      y: this.y * this.zoom
    };
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setSettings(settings) {
    this.settings = settings;
  }

  setTarget(target) {
    this.target = target;
  }

  update(dt) {
    const speed = Math.abs(this.destination.y - this.y) / 30;


    if (this.destination.y + speed < this.y) {
      this.y -= speed
    } else if (this.destination.y - speed > this.y){
      this.y += speed;
    } else {
      this.y = this.destination.y;
    }

    if (this.destination.x + speed < this.x) {
      this.x -= speed
    } else if (this.destination.x - speed > this.x){
      this.x += speed;
    } else {
      this.x = this.destination.x;
    }

  }

  setCameraPosition() {
    if (!this.target) return;
    this.x = this.target.x;
    this.destination.y = this.target.y;
    // this.y = this.target.y;
  }
}

export default Camera;
