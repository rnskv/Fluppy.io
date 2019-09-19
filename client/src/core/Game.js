import Player from './Player';
import EventEmitter from './EventEmitter';
import Loader from './Loader';

export default class Game {
    constructor({ app }) {
        this.loader = new Loader(app.loader);

        this.stage = app.stage;
        this.ticker = this.getTickerWithSettings(app.ticker, { autostart: false });
        this.players = [];
        this.updates = [];

        this.subscribe.call(this, null);
    }

    getTickerWithSettings(ticker, params) {
        Object.keys(params).forEach(key => {
            ticker[key] = params[key];
        });
        return ticker;
    }

    subscribe() {
        /* */
    }

    addPlayer(data) {
        if (this.players.find(player => player.id === data.id)) return;

        this.players.push(new Player({
            stage: this.stage,
            id: data.id,
            x: 0,
            y: 0
        }));
    }

    removePlayer(id) {
        const leaverIndex = this.players.findIndex(player => player.id === id);
        const leaver = this.players[leaverIndex];
        leaver.removeFromStage();
        this.players.slice(leaverIndex, 1)
    }

    update(dt) {
        //Сделать проверку по updates
        this.players.forEach(player => {
            player.update(dt, this.updates.players[player.id])
        })
    }

    start() {
        this.ticker.add(this.update.bind(this));
        this.ticker.start();
    }
}