export default class Server {
  constructor({ network, controller, settings }) {
    this.settings = settings;
    this.network = network;
    this.players = {};

    this.controller = controller;

    this.lastUpdate = Date.now();
    this.tickerId = null;
  }

  start() {
    this.stop();
    this.tickerId = setInterval(
      this.tick.bind(this),
      this.settings.serverFrameRate
    );
  }

  stop() {
    clearInterval(this.tickerId);
  }

  get state() {
    let result = {};

    for (let [name, manager] of this.controller.entries) {
      result[name] = manager.dataset;
    }

    return result;
  }

  emitStateToPlayer(socket) {
    if (!socket.player) return;
    const player = this.controller
      .getManager("players")
      .objects.getById(socket.player._id);

    if (player) {
      socket.emit("game:update", {
        state: this.controller.getStateForPlayerByRules(player),
        timestamp: Date.now()
      });
    }
  }

  tick() {
    const now = Date.now();
    const dt = 1 / (this.settings.clientFrameRate / (now - this.lastUpdate));
    this.lastUpdate = now;

    this.controller.update(dt);

    this.network.sockets.forEach(this.emitStateToPlayer.bind(this));
  }
}
