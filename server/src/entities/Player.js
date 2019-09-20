import GameObject from "../core/GameObject";

class Player extends GameObject {
    constructor({...params}) {
        super({...params})
    }

    get clientData() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            rotation: this.rotation
        }
    }

    update(dt) {
        if (this.x >= 990) {
            this.dx = -1 * dt;
        }

        if (this.x <= 0) {
            this.dx = 1 * dt;
        }

        if (this.y >= 290) {
            this.dy = -1 * dt;
        }

        if (this.y <= 0) {
            this.dy = 1 * dt;
        }


        if (Math.random() < 0.05) {
            this.dy = 1 * dt;
        }

        if (Math.random() >  0.95) {
            this.dy = -1 * dt;
        }

        this.rotation += 0.4 * dt;

        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }
}

export default Player;