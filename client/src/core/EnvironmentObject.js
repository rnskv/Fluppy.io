import GameObject from './GameObject';

class EvironmentObject extends GameObject {
    constructor({paralaxFactors, ...props}) {
        super({...props});
        this.dx = -1;
        this.dy = 0;
        this.speed = 0;
        this.paralaxFactors = paralaxFactors;
    }

    update(dt, updates) {
        this.runUpdates();
    }
}

export default EvironmentObject;