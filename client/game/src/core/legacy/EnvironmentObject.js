import GameObject from "../GameObject";

class EvironmentObject extends GameObject {
  constructor({ ...props }) {
    super({ ...props });
  }

  update(dt, updates, syncCamera) {
    this.runUpdates(syncCamera);
  }
}

export default EvironmentObject;
