import GameObject from './GameObject';

class EvironmentObject extends GameObject {
    constructor({...props}) {
        super({...props});
        this.dx = -1;
        this.dy = 0;
        this.speed = 0;
    }

    update(dt) {
        this.x += this.dx;

        this.object.transform.position.x = this.x - this.camera.position.x;
        this.object.transform.position.y = this.y - this.camera.position.y;
        //
        // this.object.transform.rotation = this.rotation;
        // this.object.pivot = { x: 5, y: 5 }
    }
}

export default EvironmentObject;