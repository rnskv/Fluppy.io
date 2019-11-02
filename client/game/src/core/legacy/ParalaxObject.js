import EvironmentObject from "./EnvironmentObject";

class ParalaxObject extends EvironmentObject {
  constructor({ paralaxFactors, ...props }) {
    super({ ...props });
    this.paralaxFactors = paralaxFactors;
  }

  update(dt) {
    const { camera } = this.controller;

    this.objectContainer.transform.position.x =
      ((this.x + this.offsets.x) - camera.position.x * this.paralaxFactors.x / camera.zoom);
    this.objectContainer.transform.position.y =
      ((this.y + this.offsets.y) - camera.position.y * this.paralaxFactors.y / camera.zoom);
  }
}

export default ParalaxObject;
