class Camera {
  constructor({ size, settings }) {
    this.x = 0;
    this.y = 0;
    this.target = null;
    this.size = size;
    this.zoom = 1;

    this.settings = settings || {
      max: {
        top: -300 * this.zoom,
        bottom: 600 * this.zoom,
        left: 0
      }
    };

    window.document.addEventListener('mousewheel', (e) => {
      console.log(e)
      if (e.deltaY >= 0) {
        // up
        this.changeZoom(-0.1)
      } else {
        // down
        this.changeZoom(0.1)
      }

    })
    //Сюда добавить отсутпы (120)
  }

  changeZoom(coef) {
    if (this.zoom + coef > 0.5 && this.zoom + coef < 3) {
      this.zoom += coef;
    }
  }

  get position() {
    if (this.target) {
      const x = (this.target.x * this.zoom - this.size.width / 2);
      const y = (this.target.y * this.zoom - this.size.height / 2);

      return {
        x,
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
}

export default Camera;
