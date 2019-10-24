import * as PIXI from "pixi.js";

PIXI.settings.ANISOTROPIC_LEVEL = 16;
PIXI.settings.RESOLUTION = 1;
PIXI.settings.ROUND_PIXELS = true;

export default class Client {
  constructor(root, params) {
    this.root = root;
    this.params = params;
    this.apps = {};
  }

  get size() {
    return {
      width: this.params.width,
      height: this.params.height
    };
  }

  createApp(id) {
    const { width, height } = this.params;

    this.apps[id] = new PIXI.Application({
      transparent: false,
      width,
      height,
      antialias: true,
      forceFXAA: true,
      powerPreference: 'high-performance',
      autoDensity: true
    });

    const currentView = this.apps[id].view;

    this.root.appendChild(currentView);
  }

  getApp(id) {
    return this.apps[id];
  }

  removeStage(id) {
    delete this.apps[id];
  }
}
