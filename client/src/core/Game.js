import Player from './GameObject';
import EventEmitter from './EventEmitter';
import Loader from './Loader';
import Interpolator from '../utils/interpolator';

export default class Game {
    constructor({ app, controller, settings }) {
        this.loader = new Loader(app.loader);

        this.stage = app.stage;
        this.ticker = this.getTickerWithSettings(app.ticker, { autostart: false });
        this.controller = controller;
        this.updates = [];
        this.firstServerTimestamp = 0;
        this.startGameTimestamp = 0;
        this.renderDelay = 50;

        this.settings = settings;

        this.subscribe.call(this, null);
    }

    get currentServerTime() {
        return this.firstServerTimestamp + (Date.now() - this.startGameTimestamp) - this.renderDelay;
    }

    get baseUpdateIndex() {
        const serverTime = this.currentServerTime;
        for (let i = this.updates.length - 1; i >= 0; i--) {
            if (this.updates[i].timestamp <= serverTime) {
                return i;
            }
        }
        return -1;
    }

    updateSettings(settings) {
        Object.keys(settings).forEach((key) => {
            this.settings[key] = settings[key]
        })
    }

    getTickerWithSettings(ticker, params) {
        Object.keys(params).forEach(key => {
            ticker[key] = params[key];
        });
        return ticker;
    }

    subscribe() {
        EventEmitter.subscribe('server:updates', this.onServerUpdate.bind(this));
    }

    onServerUpdate(update) {
        if (!this.firstServerTimestamp) {
            this.firstServerTimestamp = update.timestamp;
            this.startGameTimestamp = Date.now();
        }

        this.updates.push(update);

        const baseUpdateIndex = this.baseUpdateIndex;

        if (baseUpdateIndex > 0) {
            this.updates.splice(0, baseUpdateIndex);
        }
    }

    getCurrentUpdate() {
        if (!this.firstServerTimestamp) {
            return {
                players: [],
                pipes: [],
            };
        }

        const baseUpdateIndex = this.baseUpdateIndex;
        const serverTime = this.currentServerTime;

        const isInitUpdate = baseUpdateIndex < 0;
        const isFirstUpdate = baseUpdateIndex === this.updates.length - 1;

        switch (true) {
            case isInitUpdate: {
                return this.updates[this.updates.length - 1].state;
            }

            case isFirstUpdate: {
                return this.updates[baseUpdateIndex].state;
            }

            default: {
                const baseUpdate = this.updates[baseUpdateIndex];
                const next = this.updates[baseUpdateIndex + 1];
                const ratio = (serverTime - baseUpdate.timestamp) / (next.timestamp - baseUpdate.timestamp);

                if (this.settings.interpolate) {
                    return {
                        players: Interpolator.interpolateObjectsMap(baseUpdate.state.players, next.state.players, ratio),
                        pipes: Interpolator.interpolateObjectsMap(baseUpdate.state.pipes, next.state.pipes, ratio)
                    };
                } else {
                    return {
                        players: next.state.players,
                        pipes: next.state.pipes
                    };
                }
            }
        }
    }

    update(dt) {
        //Сделать проверку по updates
        for (let [managerName, manager] of this.controller.managersEntries) {
            manager.list.forEach(object => {
                object.update(dt, this.getCurrentUpdate()[managerName][object.id])
            })
        }
    }

    start() {
        this.ticker.add(this.update.bind(this));
        this.ticker.start();
    }
}