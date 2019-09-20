class GameObject {
    constructor({id, x, y}) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.dx = 1;
        this.dy = 1;
        this.speed = 1;

        this.update = this.update.bind(this)
    }

    get clientData() {
        return {
            id: this.id
        }
    }

    update(dt) {
        /* */
    }
}

export default GameObject;