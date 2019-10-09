import Client from "./core/Client";
import Builder from "./Builder";

class Injector {
  constructor() {}

  createClient(node) {
    this.client = new Client(node, {
      width: node.clientWidth,
      height: node.clientHeight
    });
  }

  inject(node) {
    this.createClient(node);
    new Builder(this.client).build();
  }
}

export default Injector;
