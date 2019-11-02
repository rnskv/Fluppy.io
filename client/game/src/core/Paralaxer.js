import RoofsManager from "../managers/legacy/roofs";
import Roof from "../entities/legacy/Roof";

class Paralaxer {
  constructor({ layers = []}) {
    this.controller = null;
    this.layers = layers;
  }

  connectController(controller) {
    this.controller = controller;
    console.log('Init paralaxer with controller', controller);
    this.init();
  }

  init() {
    this.test();
  }

  test() {
    this.addLayer({
      name: 'roofs',
      factors: {x: 1, y: 1},
      manager: new RoofsManager({
        entity: Roof,
        zIndex: -1
      })
    })
  }

  addLayer(layer) {
    this.controller.addManager(layer.name, layer.manager);
    this.layers.push(layer);
  }

  update({...params}) {
    this.layers.forEach(layer => {
      layer.manager.update({...params})
    })
  }
}

export default Paralaxer;
