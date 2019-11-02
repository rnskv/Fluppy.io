//Этот файл надо нахуй переписать

export default class Network {
  constructor(io, EventEmitter) {
    this.io = io;
    this.socket = null;
    this.EventEmitter = EventEmitter;
  }

  connect(url) {
    this.socket = this.io.connect(url)
  }

  subscribes() {
    return new Promise(resolve => {
      const { socket, EventEmitter } = this;

      console.log(EventEmitter);

      window.document.addEventListener("click", e => {
        socket.emit("game:player:click", e);
      });

      window.document.addEventListener("touchstart", e => {
        socket.emit("game:player:click", e);
      });

      window.document.addEventListener("keypress", e => {
        if (e.keyCode === 32) {
          socket.emit("game:player:click", e);
        }
      });

      EventEmitter.subscribe("game:join", playerData => {
        socket.emit("game:join", playerData);
      });

      EventEmitter.subscribe("game:leave", () => {
        socket.emit("game:leave");
        socket.disconnect();
      });

      socket.on("connect", () => {
        resolve();
        socket.on("game:update", data => {
          EventEmitter.emit("server:updates", data);
        });

        socket.on("game:player:join", data => {
          EventEmitter.emit("game:player:join", data);
        });

        socket.on("game:player:leave", data => {
          EventEmitter.emit("game:player:leave", data);
        });

        socket.on("me:init", data => {
          EventEmitter.emit("me:init", data);
        });

        socket.on("me:alreadyInGame", data => {
          EventEmitter.emit("me:alreadyInGame", data);
        });

        socket.on("me:wrongToken", data => {
          EventEmitter.emit("me:wrongToken", data);
        })

        socket.on('disconnect', console.log)
      });
    })
  }
}
