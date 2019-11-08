const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

import servers from 'shared/configs/servers';

import Server from "./core/Server";
import Controller from "./core/Controller";

import Network from "./core/Network";

import PlayersManager from "./managers/Players";
import PipesManager from "./managers/Pipes";
import CheckPointsManager from "./managers/CheckPoints";

import Player from "./entities/Player";
import Pipe from "./entities/Pipe";
import CheckPoint from "./entities/CheckPoint";

import Collider from "./core/Collider";

import settings from "./configs/settings";
import api from 'src/utils/api';

const network = new Network(io);
network.init();

const managers = {
    'players': new PlayersManager({network, entity: Player, emitRule: 'RADIUS', type: 'PLAYERS'}),
    'pipes': new PipesManager({network, entity: Pipe, emitRule: 'RADIUS', type: 'PIPES'}),
    'checkpoints': new CheckPointsManager({network, entity: CheckPoint, emitRule: 'RADIUS', type: 'CHECKPOINTS'})
};

const application = new Server({
  network,
  settings,
  controller: new Controller({ api, managers, collider: new Collider() })
});

application.start();

server.listen(servers.urls.server.port, servers.urls.server.ip, () => {
  console.log(
    `******************************************\n****Игровой сервер - ${servers.urls.server.ip}:${servers.urls.server.port}****\n******************************************`
  )
});
