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
            Object.values(data.players).forEach(player => {
                players.add(this.stage, player)
            });

            Object.values(data.pipes).forEach(pipe => {
                pipes.add(this.stage, pipe)
            });
        });

        EventEmitter.subscribe('game:player:join', player => {
            players.add(this.stage, player)
        });

        EventEmitter.subscribe('game:player:leave', id => {
            players.remove(id)
        })
    }

    update(dt) {
        //Сделать проверку по updates
        const { players, pipes } = this.managers;
        players.list.forEach(player => {
            player.update(dt, this.getCurrentUpdate().players[player.id])
        });

        console.log(this.getCurrentUpdate().pipes);

        pipes.list.forEach(pipe => {
            pipe.update(dt, this.getCurrentUpdate().pipes[pipe.id])
        })
    }
};