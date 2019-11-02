import Player from "./GameObject";
import EventEmitter from "shared/core/EventEmitter";
import Loader from "./Loader";
import Interpolator from "../utils/interpolator";

export default class Game {
  constructor({ app, controller, settings }) {
    this.loader = new Loader(app.loader);
    this.stage = app.stage;
    this.ticker = this.getTickerWithSettings(app.ticker, { autostart: false });
    this.controller = controller;

    this.updates = [];
    this.firstServerTimestamp = 0;
    this.startGameTimestamp = 0;

    this.settings = settings;
    window.game = this;
    this.subscribe.call(this, null);
  }

  get currentServerTime() {
    return (
      this.firstServerTimestamp +
      (Date.now() - this.startGameTimestamp) -
      this.settings.renderDelay
    );
  }

  get baseUpdateIndex() {
    const serverTime = this.currentServerTime;
    for (let i = this.updates.length - 1; i >= 0; i--) {
      if (this.updates[i].timestamp <= serverTime) {
        return i;
      }
    }
    return -1;
  }

  get initState() {
    let result = {};
    for (let [managerName] of this.controller.managers.entries) {
      result[managerName] = {};
    }
    return result;
  }
  updateSettings(settings) {
    Object.keys(settings).forEach(key => {
      this.settings[key] = settings[key];
    });
  }

  getTickerWithSettings(ticker, params) {
    Object.keys(params).forEach(key => {
      ticker[key] = params[key];
    });
    return ticker;
  }

  subscribe() {
    EventEmitter.subscribe("server:updates", this.onServerUpdate.bind(this));
  }

  onServerUpdate(update) {
    if (!this.firstServerTimestamp) {
      this.firstServerTimestamp = update.timestamp;
      this.startGameTimestamp = Date.now();
    }

    this.updates.push(update);

    const baseUpdateIndex = this.baseUpdateIndex;

    if (baseUpdateIndex > 0) {
      this.updates.splice(0, baseUpdateIndex);
    }
  }

  get ratio() {
    const baseUpdateIndex = this.baseUpdateIndex;
    const serverTime = this.currentServerTime;

    const isInitUpdate = baseUpdateIndex < 0;
    const isNotIterpolatedUpdate = baseUpdateIndex === this.updates.length - 1;

    if (isInitUpdate || isNotIterpolatedUpdate) return 1;

    const baseUpdate = this.updates[baseUpdateIndex];
    const next = this.updates[baseUpdateIndex + 1];
    return (serverTime - baseUpdate.timestamp) /
      (next.timestamp - baseUpdate.timestamp);
  }

  getCurrentUpdate() {
    if (!this.firstServerTimestamp) {
      return {
        managers: this.initState,
        timestamp: 0
      };
    }

    const baseUpdateIndex = this.baseUpdateIndex;
    const serverTime = this.currentServerTime;

    const isInitUpdate = baseUpdateIndex < 0;
    const isNotIterpolatedUpdate = baseUpdateIndex === this.updates.length - 1;

    switch (true) {
      case isInitUpdate: {
        return {
          managers: this.updates[this.updates.length - 1].state,
          timestamp: 0,
        };
      }

      case isNotIterpolatedUpdate: {
        return {
          managers: this.updates[baseUpdateIndex].state,
          timestamp: 0
        };
      }

      default: {
        const baseUpdate = this.updates[baseUpdateIndex];
        const next = this.updates[baseUpdateIndex + 1];
        const ratio =
          (serverTime - baseUpdate.timestamp) /
          (next.timestamp - baseUpdate.timestamp);

        if (this.settings.interpolate) {
          return {
            managers: {
              checkpoints: Interpolator.interpolateObjectsMap(
                baseUpdate.state.checkpoints,
                next.state.checkpoints,
                ratio
              ),
              players: Interpolator.interpolateObjectsMap(
                baseUpdate.state.players,
                next.state.players,
                ratio
              ),
              pipes: Interpolator.interpolateObjectsMap(
                baseUpdate.state.pipes,
                next.state.pipes,
                ratio
              )
            },
            timestamp: baseUpdate.timestamp,
          };
        } else {
          return {
            managers: {
              players: next.state.players,
              pipes: next.state.pipes,
              checkpoints: next.state.checkpoints,
            },
            timestamp: next.timestamp
          };
        }
      }
    }
  }

  update(dt) {
    const currentUpdate = this.getCurrentUpdate();
    this.controller.camera.setCameraPosition();
    this.controller.camera.update();

    for (const [managerName, manager] of this.controller.managers.entries) {
      if (!manager.isEnvironment) {
        if (!currentUpdate.managers[managerName]) {
          console.error(`Hasn't state for manager: ${managerName}`);
          return;
        }
        manager.update(dt, currentUpdate.managers[managerName]);
      } else {
        manager.update(dt);
      }
    }
  }

  start() {
    this.ticker.add(this.update.bind(this));
    this.ticker.start();
  }

  stop() {
    this.ticker.stop();
  }

  unmount() {
    const stage = this.stage;
    // this.controller.managersList.forEach(manager => manager.clearContainer())
    for (var i = stage.children.length - 1; i >= 0; i--) {
      stage.removeChild(stage.children[i]);
    }
  }
}
