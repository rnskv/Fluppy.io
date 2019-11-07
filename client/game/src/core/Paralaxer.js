import ParalaxManager from "./legacy/ParalaxManager";
import Floor from "../entities/legacy/Floor";
import Roof from "../entities/legacy/Roof";

import BgLayer1 from "../entities/BgLayer1";
import BgLayer3 from "../entities/BgLayer3";
import BgLayer4 from "../entities/BgLayer4";


class Paralaxer {
  constructor({ layers = []}) {
    this.controller = null;
    this.layers = layers;
    window.paralaxer = this;
  }

  connectController(controller) {
    this.controller = controller;
    this.init();
  }

  init() {
    // this.test();
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
        name: 'bgLayers1',
        manager: new ParalaxManager({
          entity: BgLayer1,
          zIndex: -1,
          startPosition: {
            x: 0,
            y: 0
          },
          paralaxFactors: {
            x: 0.3,
            y: 0.5,
          }
        })
      }
    );

    this.addLayer({
        name: 'bgLayers3',
        manager: new ParalaxManager({
          entity: BgLayer3,
          zIndex: -1,
          startPosition: {
            x: 0,
            y: 0
          },
          paralaxFactors: {
            x: 0.6,
            y: 0.7,
          }
        })
      }
    );

    this.addLayer({
        name: 'bgLayers4',
        manager: new ParalaxManager({
          entity: BgLayer4,
          zIndex: -1,
          startPosition: {
            x: 0,
            y: 0
          },
          paralaxFactors: {
            x: 0.8,
            y: 0.9,
          }
        })
      }
    );
  }

  addLayer(layer) {
    this.layers.push(layer);
    this.controller.addManager(layer.name, layer.manager);
  }

}

export default Paralaxer;
