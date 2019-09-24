import GameObject from "../core/GameObject";

class Player extends GameObject {
    constructor({...params}) {
        super({...params})

        this.speed = 1;
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
        const mirageX = this.x + this.dx * this.speed * dt;
        const mirageY = this.y + this.dy * this.speed * dt;

        if (mirageX >= 990) {
            this.dx = -1;
        }

        if (mirageX <= 0) {
            this.dx = 1;
        }

        if (mirageY >= 290) {
            this.dy = -1;
        }

        if (mirageY <= 0) {
            this.dy = 1;
        }

        if (Math.random() < 0.05) {
            this.dy = 1;
            this.dx = -1;
            this.speed = Math.random() * 3 + 3;
        }

        if (Math.random() >  0.95) {
            this.dy = -1;
            this.speed = Math.random() * 3 + 3;
        }

        this.x += this.dx * this.speed * dt;
        this.y += this.dy * this.speed * dt;

        this.rotation += 1 * dt;
    }
}

export default Player;