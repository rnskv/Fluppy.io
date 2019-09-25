import Client from './core/Client';
import Network from './core/Network';
import Camera from './core/Camera';


import PlayersManager from './managers/players';
import PipesManager from './managers/pipes';

import Controller from './core/Controller';


import Proton from './Proton';

const gameStage = document.createElement('canvas');
const rootNode = document.querySelector('#root');

const client = new Client(rootNode, { width: 1280, height: 600 });

client.createApp('game');

const app = client.getApp('game');
const stage = app.stage;
const camera = new Camera();

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

const controller = new Controller(managers);

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