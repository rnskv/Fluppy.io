import Game from './core/Game';
import Player from "./entities/Player";
import EventEmitter from "./core/EventEmitter";

export default class Proton extends Game{
    constructor({...params}) {
        super({...params});
    }

    subscribe() {
        const { players, pipes } = this.manager.entries;

        super.subscribe();
        EventEmitter.subscribe('me:init', data => {
            console.log('Init player')
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

        this.manager.names.forEach(managerName => {
            const manager = this.manager.get(managerName);

            manager.clearActives();
            Object.values(serverState[managerName]).forEach(data => {
                manager.moveToActive(data.id);
                if (manager.isExist(data.id)) {
                    manager.get(data.id).update(dt, data)
                } else {
                    manager.add(this.stage, data);
                    manager.get(data.id).update(dt, data);
                }
            });
        });
    }
};