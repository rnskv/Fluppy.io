import Client from './core/Client';
import Network from './core/Network';
import Camera from './core/Camera';


import PlayersManager from './managers/players';
import PipesManager from './managers/pipes';

import PlayerStore from './stores/PlayerStore';

import Controller from './core/Controller';


import Proton from './Proton';

const gameStage = document.createElement('canvas');
const rootNode = document.querySelector('#root');

const client = new Client(rootNode, { width: window.innerWidth, height: window.innerHeight - 100 });

client.createApp('game');

const app = client.getApp('game');
const stage = app.stage;
const camera = new Camera({size: client.size});

const managers = {
    players: new PlayersManager({
        stage,
        camera
    }),
    pipes: new PipesManager({
        stage,
        camera
    })
};

const stores = {
    player: new PlayerStore({
        id: null
    })
};

const controller = new Controller(managers, stores);

const game = new Proton({
    app,
    controller,
    camera,
    settings: {
        interpolate: true
    }
});

game.start();

window.game = game;