import Client from './core/Client';
import Network from './core/Network';

import Proton from './classes/Proton';

const gameStage = document.createElement('canvas');
const rootNode = document.querySelector('#root');

const client = new Client(rootNode, { width: 1000, height: 1000 });

client.setStage('game', gameStage);

const game = new Proton(
    client.getStage('game')
);

game.start();