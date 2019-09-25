const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

import Server from './core/Server';
import Controller from './core/Controller';

import Network from './core/Network';

import PlayersManager from './managers/Players';
import BirdsManager from './managers/Players';
import PipesManager from './managers/Pipes';

import settings from "./configs/settings";

const network = new Network(io);
network.init();

const managers = {
    'players': new PlayersManager({network}),
    'birds': new BirdsManager({network}),
    'pipes': new PipesManager({network}),
};

const application = new Server({
    network,
    settings,
    controller: new Controller(managers)
});

application.start();


server.listen(3000);