import GameObject from "../core/GameObject";
import settings from '../configs/settings';


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

class Player extends GameObject {
    constructor({isBot, ...params}) {
        super({...params})

        this.speed = 1;

        this.dx = 0;
        this.dy = 10;

        this.width = 30;
        this.height = 30;

        this.pivot = { x: this.width / 2, y: this.height / 2 };
        this.gravity = 9.8;
        this.moveUpRotation = 35;

        this.isBot = isBot;

        this.maxDX = 1.5;
        this.isDie = false;

        if (this.isBot) {
            this.botClick()
        }
    }

    botClick() {
        this.onClick();
        setTimeout(this.botClick.bind(this), getRandomInt(100, 700));
    }

    get clientData() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            pivot: this.pivot,
            rotation: (Math.PI * this.rotation) / 180
        }
    }

    onClick() {
        if (this.isDie) return;
        this.dy = -7;
        this.rotation = -40;
        this.y -= 1;
    }

    onCollide(object) {
        // this.x = object.x - this.width;
        this.kill();
    }

    kill() {
        if (this.isDie) return;
        this.dx = 0;
        this.rotation = 90;
        this.isDie = true;
        this.dy = -10;
    }

    spawn() {
        this.y = 0;
        this.x = 0;
        this.rotation = 0;
        this.isDie = false;
    }

    update(dt) {
        this.methods.spawnPipe(this.x, 0);
        if (this.dy < 6) {
            this.dy += 0.5 * dt;
        }

        if (this.dx < this.maxDX && !this.isDie) {
            this.dx += 0.5 * dt;
        }

        if (this.rotation < this.moveUpRotation) {
            this.rotation += Math.abs(this.dy) / 2 * dt;
        }

        if (this.y < settings.map.border.top) {
            this.kill();
        }

        if (this.y + this.dy * this.speed * dt < settings.map.border.bottom) {
            this.x += this.dx * this.speed * dt;
            this.y += this.dy * this.speed * dt;
        } else {
            if (this.x > 500) {
                this.spawn();
            } else {
                this.rotation = 0;
                this.isDie = false;
            }
        }
    }
}

export default Player;