//Этот файл надо нахуй переписать

export default class Network {
  constructor(io, EventEmitter) {
    this.io = io;
    this.socket = null;
    this.EventEmitter = EventEmitter;

    this.handleClick = this.handleClick.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this)
  }

  connect(url) {
    this.socket = this.io.connect(url)
  }

  unsubscribe() {
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("touchstart", this.handleTouchStart);
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  handleClick(e) {
    const { socket, EventEmitter } = this;
    socket.emit("game:player:click", e);
  }

  handleTouchStart(e) {
    const { socket, EventEmitter } = this;

    socket.emit("game:player:click", e);
  }

  handleKeyPress(e) {
    const { socket, EventEmitter } = this;

    if (e.keyCode === 32) {
      socket.emit("game:player:click", e);
    }
  }

  subscribes() {
    return new Promise(resolve => {
      const { socket, EventEmitter } = this;

      document.addEventListener("click", this.handleClick);
      document.addEventListener("touchstart", this.handleTouchStart);
      document.addEventListener("keypress", this.handleKeyPress);

      EventEmitter.subscribe("game:unmount", () => {
        this.unsubscribe()
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
