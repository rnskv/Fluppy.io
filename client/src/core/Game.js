import Player from './GameObject';
import EventEmitter from './EventEmitter';
import Loader from './Loader';
function interpolateObject(object1, object2, ratio) {
    if (!object2) {
        return object1;
    }

    const interpolated = {};
    Object.keys(object1).forEach(key => {
        switch (key) {
            case 'x':
            case 'y':
            case 'rotation':
                interpolated[key] = object1[key] + (object2[key] - object1[key]) * ratio;
                break;
            default:
                interpolated[key] = object2[key];
                break;
        }
    });

    return interpolated;
};

function interpolateObjectArray(objects1, objects2, ratio) {
    return objects1
}

function interpolateObjectsMap(object1, object2, ratio) {
    const result = {};
    Object.keys(object1).forEach((key, index) => {
        const item1 = object1[key];
        const item2 = object2[key];

        result[key] = interpolateObject(item1, item2, ratio)
    });


    return result;
}

export default class Game {
    constructor({ app, managers }) {
        this.loader = new Loader(app.loader);

        this.stage = app.stage;
        this.ticker = this.getTickerWithSettings(app.ticker, { autostart: false });
        this.managers = managers;
        this.updates = [];

        this.firstServerTimestamp = 0;
        this.startGameTimestamp = 0;
        this.renderDelay = 50;

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

    getTickerWithSettings(ticker, params) {
        Object.keys(params).forEach(key => {
            ticker[key] = params[key];
        });
        return ticker;
    }

    subscribe() {
        EventEmitter.subscribe('server:updates', update => {
            if (!this.firstServerTimestamp) {
                this.firstServerTimestamp = update.timestamp;
                this.startGameTimestamp = Date.now();
            }

            this.updates.push(update);

            const baseUpdateIndex = this.baseUpdateIndex;

            if (baseUpdateIndex > 0) {
                this.updates.splice(0, baseUpdateIndex);
            }
        });
    }

    getCurrentUpdate() {
        if (!this.firstServerTimestamp) {
            return {
                players: []
            };
        }

        const baseUpdateIndex = this.baseUpdateIndex;
        const serverTime = this.currentServerTime;

        if (baseUpdateIndex < 0) {
            return this.updates[this.updates.length - 1].update;
        } else if (baseUpdateIndex === this.updates.length - 1) {
            return this.updates[baseUpdateIndex].update;
        } else {
            const baseUpdate = this.updates[baseUpdateIndex];
            const next = this.updates[baseUpdateIndex + 1];
            const r = (serverTime - baseUpdate.timestamp) / (next.timestamp - baseUpdate.timestamp);

            const withInterpolate = true;

            return {
                players: withInterpolate ? interpolateObjectsMap(baseUpdate.update.players, next.update.players, r) : next.update.players
            };
        }

    }

    update(dt) {
        //Сделать проверку по updates
        const { players } = this.managers;
        players.list.forEach(player => {
            player.update(dt, this.getCurrentUpdate().players[player.id])
        })
    }

    start() {
        this.ticker.add(this.update.bind(this));
        this.ticker.start();
    }
}