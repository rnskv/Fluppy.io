import Game from './core/Game';
import Player from "./entities/Player";
import EventEmitter from "./core/EventEmitter";

export default class Proton extends Game{
    constructor({...params}) {
        super({...params});
    }

    subscribe() {
        const { players, pipes } = this.managers;

        super.subscribe();
        EventEmitter.subscribe('me:init', data => {
            // Object.values(data.players).forEach(player => {
            //     players.add(this.stage, player)
            // });

            // Object.values(data.pipes).forEach(pipe => {
            //     pipes.add(this.stage, pipe)
            // });
        });

        // EventEmitter.subscribe('game:player:join', player => {
        //     players.add(this.stage, player)
        // });

        EventEmitter.subscribe('game:player:leave', id => {
            players.remove(id)
        })
    }

    update(dt) {
        //Сделать проверку по updates
        const { players, pipes } = this.managers;

        const serverState = this.getCurrentUpdate();

        Object.values(serverState.players).forEach(playerData => {
            if (players.isExist(playerData.id)) {
                players.get(playerData.id).update(dt, playerData)
            } else {
                players.add(this.stage, playerData);
                players.get(playerData.id).update(dt, playerData);
            }
        });

        console.log(serverState);

        Object.values(serverState.pipes).forEach(pipesData => {
            if (pipes.isExist(pipesData.id)) {
                pipes.get(pipesData.id).update(dt, pipesData)
            } else {
                pipes.add(this.stage, pipesData);
                pipes.get(pipesData.id).update(dt, pipesData);
            }
        });
    }
};