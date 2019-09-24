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

    }
}

export default Pipe;