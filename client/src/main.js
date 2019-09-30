import Client from './core/Client';
import Network from './core/Network';
import Camera from './core/Camera';


import PlayersManager from './managers/players';
import PipesManager from './managers/pipes';

import FloorsManager from './managers/floors';

import PlayerStore from './stores/PlayerStore';
import MainStore from './stores/MainStore';

import Controller from './core/Controller';

import Player from "./entities/Player";
import Pipe from "./entities/Pipe";
import Floor from "./entities/Floor";

import Proton from './Proton';

const rootNode = document.querySelector('#root');
const client = new Client(rootNode, { width: window.innerWidth, height: window.innerHeight - 100 });

client.createApp('game');

const app = client.getApp('game');
const stage = app.stage;

const managers = {
    players: new PlayersManager({
        entity: Player
    }),
    pipes: new PipesManager({
        entity: Pipe
    }),
    floors: new FloorsManager({
        entity: Floor
    })
};

const stores = {
    player: new PlayerStore({
        id: null
    }),
    main: new MainStore({
        settings: null,
        resources: null
    })
};

const camera = new Camera({ size: client.size });

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

game.loader.addManifest({
    'wordAssests': '/resources/jsons/wordassets.json',
    'viking': '/resources/jsons/viking.json'
});

game.loader.load((loader, resources) => {
    //@todo Вынести эту логику в другое место.
    stores.main.set('resources', resources);
});

game.start();

window.game = game;