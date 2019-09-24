class Network {
    constructor(io) {
        this.io = io;
        this.handlers = {};
        this.init = this.init.bind(this);
    }

    get sockets() {
        return Object.values(this.io.sockets.sockets)
    }

    init() {
        this.io.on('connection', socket => {
            Object.keys(this.handlers).forEach(eventName => {
                const callbacks = this.handlers[eventName];
                socket.on(eventName, () => {
                    callbacks.forEach(callback => callback(socket))
                })
            })
        })
    }

    subscribe(eventName, callback) {
        //Здесь нужна проверка
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(callback);
    }
}

export default Network;