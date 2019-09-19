class Player {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;

        this.dx = 1;
        this.dy = 1;
        this.speed = 1;

        this.update = this.update.bind(this)
    }

    get clientData() {
        return {
            id: this.id,
            x: this.x,
            y: this.y
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

        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }
}

export default Player;