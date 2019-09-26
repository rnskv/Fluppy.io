class GameObject {
    constructor({id, x, y, methods}) {
        this.id = id;

        this.x = x;
        this.y = y;

        this.dx = 1;
        this.dy = 1;

        this.speed = 1;

        this.rotation = 0;

        this.methods = methods;

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