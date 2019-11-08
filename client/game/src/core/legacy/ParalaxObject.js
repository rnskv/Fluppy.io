import EvironmentObject from "./EnvironmentObject";

class ParalaxObject extends EvironmentObject {
  constructor({ paralaxFactors, ...props }) {
    super({ ...props });
    this.paralaxFactors = paralaxFactors;
  }

  update(dt, updates, syncCamera) {
    const { camera } = this.controller;
    super.update(dt, updates, syncCamera);

    this.objectContainer.transform.position.x =
      ((this.x + this.offsets.x) * camera.zoom - camera.position.x) * this.paralaxFactors.x;
    this.objectContainer.transform.position.y =
      ((this.y + this.offsets.y) * camera.zoom - camera.position.y) * this.paralaxFactors.y;

  }
}

export default ParalaxObject;
