import Client from './core/Client';
import Network from './core/Network';
import Camera from './core/Camera';


import PlayersManager from './managers/players';
import PipesManager from './managers/pipes';
import FloorsManager from './managers/floors';
import ForestManager from './managers/forest';
import SilhouetteManager from './managers/silhoutte';
import ThicketsManager from './managers/thickets';
import LeavesManager from './managers/leaves';
import ConopyesManager from './managers/conopyes';

import PlayerStore from './stores/PlayerStore';
import MainStore from './stores/MainStore';

import Controller from './core/Controller';

import Player from "./entities/Player";
import Pipe from "./entities/Pipe";
import Floor from "./entities/Floor";
import Forest from "./entities/Forest";
import Silhouette from "./entities/Silhouette";
import Thicket from "./entities/Thicket";
import Leave from "./entities/Leave";
import Conopy from "./entities/Conopy";

import Proton from './Proton';

const rootNode = document.querySelector('#root');
const client = new Client(rootNode, { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });

client.createApp('game');

const app = client.getApp('game');
const stage = app.stage;

const managers = {
    forest: new ForestManager({
        entity: Forest
    }),
    thickets: new ThicketsManager({
        entity: Thicket
    }),
    silhouette: new SilhouetteManager({
        entity: Silhouette
    }),
    conopyes: new ConopyesManager({
        entity: Conopy
    }),
    pipes: new PipesManager({
        entity: Pipe
    }),
    floors: new FloorsManager({
        entity: Floor
    }),
    players: new PlayersManager({
        entity: Player
    }),
    leaves: new LeavesManager({
        entity: Leave
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
    'pipe': '/resources/jsons/pipe.png',
    'viking': '/resources/jsons/viking.json',
    'background': '/resources/images/background.png',
    'player': '/resources/images/player.png'
});

game.loader.load((loader, resources) => {
    //@todo Вынести эту логику в другое место.
    stores.main.set('resources', resources);
    alert('Загрузка ресурсов завершена')
    game.start();
});


window.game = game;