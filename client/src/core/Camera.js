class Camera {
    constructor({ size }) {
        this.x = 0;
        this.y = 0;
        this.target = null;
        this.size = size;
    }

    get position() {
        if (this.target) {
            return {
                x: this.target.x - this.size.width / 2,
                y: this.target.y - this.size.height / 2
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

    setTarget(target) {
        this.target = target;
    }
}

export default Camera