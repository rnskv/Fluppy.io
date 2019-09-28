import Client from './core/Client';
import Network from './core/Network';
import Camera from './core/Camera';


import PlayersManager from './managers/players';
import PipesManager from './managers/pipes';

import FloorsManager from './managers/floors';

import PlayerStore from './stores/PlayerStore';
import MainStore from './stores/MainStore';

import Controller from './core/Controller';


import Proton from './Proton';

const rootNode = document.querySelector('#root');
const client = new Client(rootNode, { width: window.innerWidth, height: window.innerHeight - 100 });

client.createApp('game');

const app = client.getApp('game');
const stage = app.stage;
const camera = new Camera({size: client.size});

const managers = {
    players: new PlayersManager({
        stage
    }),
    pipes: new PipesManager({
        stage
    }),
    floors: new FloorsManager({
        stage
    })
};

const stores = {
    player: new PlayerStore({
        id: null
    }),
    main: new MainStore({
        settings: null
    })
};

const controller = new Controller({
    managers,
    stores,
    camera,
    stage
});

const game = new Proton({
    app,
    controller,
    settings: {
        interpolate: true
    }
});

game.start();

window.game = game;