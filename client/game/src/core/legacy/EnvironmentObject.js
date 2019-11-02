import GameObject from "../GameObject";

class EvironmentObject extends GameObject {
  constructor({ ...props }) {
    super({ ...props });
  }

  update(dt, updates) {
    this.runUpdates();
  }
}

export default EvironmentObject;
