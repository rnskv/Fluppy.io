class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.target = null;
    }

    get position() {
        if (this.target) {
            return {
                x: this.target.x,
                y: this.target.y
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