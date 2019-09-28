import GameObject from "../core/GameObject";

class Pipe extends GameObject {
    constructor({...params}) {
        super({...params})
    }

    get clientData() {
        return {
            id: this.id,
            x: this.x,
            y: this.y
        }
    }

    update(dt) {
        if (this.x < 1280) {
            // this.x += 10;
        } else {
            this.x = 0;
        }
    }
}

export default Pipe;