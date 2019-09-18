import Player from './Player';
import EventEmitter from './EventEmitter';

export default class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.isStarting = false;
        this.animationFrameId = null;

        this.players = [];
        this.updates = {};

        EventEmitter.subscribe('me:init', data => {
            console.log('get init', data)


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

    addPlayer(data) {
        if (this.players.find(player => player.id === data.id)) return;
        this.players.push(new Player({id: data.id, x: 0, y: 0}));
    }

    loop(dt) {
        if (!this.isStarting) return;

        this.update(dt);
        this.draw();

        this.animationFrameId = requestAnimationFrame(this.loop.bind(this))
    }

    update(dt) {
        //Сделать проверку по updates
        this.players.forEach(player => {
            player.update(dt, this.updates.players[player.id])
        })
    }

    draw() {
        const { offsetWidth, offsetHeight } = this.ctx.canvas;
        this.ctx.clearRect(0, 0, offsetWidth, offsetHeight);
        this.players.forEach(player => {
            player.draw(this.ctx)
        })
    }

    start() {
        if (this.isStarting) return;

        this.isStarting = true;
        this.loop();
    }

    stop() {
        if (!this.isStarting) return;
        this.isStarting = false;
        cancelAnimationFrame(this.animationFrameId);
    }
}