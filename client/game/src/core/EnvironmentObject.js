import GameObject from "./GameObject";

class EvironmentObject extends GameObject {
  constructor({ ...props }) {
    super({ ...props });
    this.dx = -1;
    this.dy = 0;
    this.speed = 0;
  }

  update(dt, updates) {
    this.runUpdates();
  }
}

export default EvironmentObject;
