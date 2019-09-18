const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

import Server from './core/Server';

import PlayersManager from './managers/Players';

class Network {
    constructor(io) {
        this.io = io;
        this.handlers = {};
        this.init = this.init.bind(this);
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

const network = new Network(io);
network.init();

const managers = {
    'players': new PlayersManager({network})
};

const application = new Server({
    network,
    managers
});

application.start();


server.listen(3000);