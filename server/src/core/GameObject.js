class GameObject {
    constructor({id, x, y, width, height, methods}) {
        this.id = id;

        this.x = x;
        this.y = y;

        this.width = width || 10;
        this.height = height || 10;

        this.dx = 1;
        this.dy = 1;

        this.speed = 1;

        this.rotation = 0;

        this.methods = methods;

        this.update = this.update.bind(this)
    }

    onCollide(object) {
        console.log(`Object ${this.id} collide with object ${object.id}`)
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