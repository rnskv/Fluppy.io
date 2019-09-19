import Client from './core/Client';
import Network from './core/Network';

import PlayersManager from './managers/players';

import Proton from './entities/Proton';

const gameStage = document.createElement('canvas');
const rootNode = document.querySelector('#root');

const client = new Client(rootNode, { width: 1000, height: 300 });

client.createApp('game');


const game = new Proton({
    app: client.getApp('game'),
    managers: {
        players: new PlayersManager({
            stage: client.getApp('game').stage
        })
    }
});

game.start();