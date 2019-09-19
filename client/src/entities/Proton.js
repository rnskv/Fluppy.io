import Game from '../core/Game';
import Player from "../entities/Player";
import EventEmitter from "../core/EventEmitter";

export default class Proton extends Game{
    constructor({ app, managers }) {
        super({ app, managers });
    }

    subscribe() {
        const { players } = this.managers;
        super.subscribe();
        EventEmitter.subscribe('me:init', data => {
            Object.values(data.players).forEach(player => {
                players.add(this.stage, player)
            })
        });

        EventEmitter.subscribe('game:player:join', player => {
            players.add(this.stage, player)
        });

        EventEmitter.subscribe('game:player:leave', id => {
            players.remove(id)
        })
    }
};