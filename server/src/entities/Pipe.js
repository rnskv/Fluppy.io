import GameObject from "../core/GameObject";

class Pipe extends GameObject {
    constructor({...params}) {
        super({...params});

        this.dx = 0;
        this.dy = 1;

        this.distance = 1;
    }

    get clientData() {
        return {
            id: this.id,
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y
        }
    }

    update(dt) {
        if (this.distance > 100) {
            this.dy = -this.x / 1000;
        }

        if (this.distance < -100) {
            this.dy = this.x / 1000;
        }

        if (this.x > 1000) {
            this.distance += this.dy;

            this.y += this.dy;
        }
    }
}

export default Pipe;