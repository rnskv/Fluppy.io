class Player {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;

        this.dx = 1;
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

    update() {
        if (this.x >= 300) {
            this.dx = -1;
        }

        if (this.x <= 0) {
            this.dx = 1;
        }

        this.x += this.dx * this.speed;
    }
}

export default Player;