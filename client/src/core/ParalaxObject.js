import EvironmentObject from "./EnvironmentObject";

class ParalaxObject extends EvironmentObject {
    constructor({paralaxFactors, ...props}) {
        super({...props})
        this.paralaxFactors = paralaxFactors;
    }

    update(dt) {
        this.object.transform.position.x =  Math.floor(this.x +  this.controller.camera.position.x * this.paralaxFactors.x);
        this.object.transform.position.y =  Math.floor(this.y +  this.controller.camera.position.y * this.paralaxFactors.y);
    }
}

export default ParalaxObject;