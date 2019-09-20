const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

import Server from './core/Server';
import Network from './core/Network';

import PlayersManager from './managers/Players';

import settings from "./configs/settings";

const network = new Network(io);
network.init();

const managers = {
    'players': new PlayersManager({network})
};

const application = new Server({
    network,
    managers,
    settings
});

application.start();


server.listen(3000);