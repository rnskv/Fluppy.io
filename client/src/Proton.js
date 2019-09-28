import Game from './core/Game';
import Player from "./entities/Player";
import EventEmitter from "./core/EventEmitter";

export default class Proton extends Game {
    constructor({...params}) {
        super({...params});
    }

    subscribe() {
        super.subscribe();
        console.log(this);
        const players = this.controller.getManager('players');

        EventEmitter.subscribe('me:init', data => {
            console.log('Init player', data);
            this.controller.stores.player.set('id', data.id);
        });

        EventEmitter.subscribe('game:player:join', player => {
            console.log('Player join into game')
        });

        EventEmitter.subscribe('game:player:leave', id => {
            players.remove(id);
            console.log('Player leave from game')
        })
    }

    update(dt) {
        const serverState = this.getCurrentUpdate();

        for (let [managerName, manager] of this.controller.managersEntries) {
            manager.clearActives();
            Object.values(serverState[managerName]).forEach(data => {
                manager.moveToActive(data.id);
                if (manager.isExist(data.id)) {
                    manager.get(data.id).update(dt, data)
                } else {
                    manager.add(data);
                    manager.get(data.id).update(dt, data);
                }
            });
        }
    }
};