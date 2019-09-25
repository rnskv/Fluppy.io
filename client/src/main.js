import Client from './core/Client';
import Network from './core/Network';

import PlayersManager from './managers/players';
import PipesManager from './managers/pipes';

import GlobalManager from './core/GlobalManager';


import Proton from './Proton';

const gameStage = document.createElement('canvas');
const rootNode = document.querySelector('#root');

const client = new Client(rootNode, { width: 1280, height: 600 });

client.createApp('game');

const app = client.getApp('game');
const stage = app.stage;

const managers = {
    players: new PlayersManager({
        stage
    }),
    pipes: new PipesManager({
        stage
    })
};

const manager = new GlobalManager(managers);

const game = new Proton({
    app,
    manager,
    settings: {
        interpolate: true
    }
});

game.start();

window.game = game;