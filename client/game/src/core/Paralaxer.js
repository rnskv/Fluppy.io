import ParalaxManager from "./legacy/ParalaxManager";
import Background from "../entities/legacy/Background";
import Floor from "../entities/legacy/Floor";

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
      manager: new ParalaxManager({
        entity: Roof,
        zIndex: 1,
        startPosition: {
          x: 0,
          y: -800
        },
        paralaxFactors: {
          x: 1,
          y: 1,
        }
      })
    });

    this.addLayer({
      name: 'floors',
      manager: new ParalaxManager({
        entity: Floor,
        zIndex: 1,
        startPosition: {
          x: 0,
          y: 1000
        },
        paralaxFactors: {
          x: 1,
          y: 1,
        }
      })
    });

    this.addLayer({
        name: 'backgrounds',
        manager: new ParalaxManager({
          entity: Background,
          zIndex: -1,
          startPosition: {
            x: 0,
            y: 0
          },
          paralaxFactors: {
            x: 0.9,
            y: 0.9,
          }
        })
      }
    )
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
