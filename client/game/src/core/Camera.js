class Camera {
    constructor({ size, settings }) {
        this.x = 0;
        this.y = 0;
        this.target = null;
        this.size = size;
        this.settings = settings || {
            max: {
                top: -300,
                bottom: 600,
                left: 0
            }
        };

        //Сюда добавить отсутпы (120)
    }

    get position() {
        if (this.target) {
            const x = this.target.x - this.size.width / 2;
            const y = this.target.y - this.size.height / 2;

            return {
                x: x > this.settings.max.left
                    ? x
                    : this.settings.max.left ,

                y: y > this.settings.max.top
                    ? y + this.size.height < this.settings.max.bottom + 120
                        ? y
                        : this.settings.max.bottom - this.size.height + 120
                    : this.settings.max.top
            }
        }

        return {
            x: this.x,
            y: this.y
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setSettings(settings) {
        this.settings = settings
    }

    setTarget(target) {
        this.target = target;
    }
}

export default Camera