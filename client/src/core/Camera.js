class Camera {
    constructor({ size, settings }) {
        this.x = 0;
        this.y = 0;
        this.target = null;
        this.size = size;
        this.settings = settings || {
            max: {
                top: -200,
                bottom: 900,
                left: 0
            }
        };
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
                    ? y + this.size.height < this.settings.max.bottom
                        ? y
                        : this.settings.max.bottom - this.size.height
                    : this.settings.max.top
            }
        }

        console.log(this.settings)
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