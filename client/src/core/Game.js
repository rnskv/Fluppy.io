import Player from './GameObject';
import EventEmitter from './EventEmitter';
import Loader from './Loader';

export default class Game {
    constructor({ app, managers }) {
        this.loader = new Loader(app.loader);

        this.stage = app.stage;
        this.ticker = this.getTickerWithSettings(app.ticker, { autostart: false });
        this.managers = managers;
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

    update(dt) {
        //Сделать проверку по updates
        const { players } = this.managers;
        players.list.forEach(player => {
            player.update(dt, this.updates.players[player.id])
        })
    }

    start() {
        this.ticker.add(this.update.bind(this));
        this.ticker.start();
    }
}