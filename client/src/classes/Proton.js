import Game from '../core/Game';
import Player from "../core/Player";
import EventEmitter from "../core/EventEmitter";

export default class Proton extends Game{
    constructor({ app }) {
        super({ app });
    }

    subscribe() {
        EventEmitter.subscribe('me:init', data => {
            Object.values(data.players).forEach(player => {
                this.addPlayer(player)
            })
        });

        EventEmitter.subscribe('server:updates', data => {
            this.updates = data;
        });

        EventEmitter.subscribe('game:player:join', data => {
            this.addPlayer(data)
        })
    }
};