import GameObject from "../core/GameObject";
import settings from '../configs/settings';

class Player extends GameObject {
    constructor({...params}) {
        super({...params})

        this.speed = 1;

        this.dx = 10;
        this.dy = 0;
    }

    get clientData() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            rotation: (Math.PI * this.rotation) / 180
        }
    }

    onClick() {
        this.dy = -8;
        this.dx = 10;
        this.rotation = -15;
    }

    update(dt) {

        if (this.dy < 9.8) {
            this.dy += 1;
            this.y = this.y - 1;
        }

        if (this.rotation < 25) {
            this.rotation += 5;
        }

        if (this.y < settings.map.border - this.height) {
            this.dy = 10;
        }

        if (this.y + this.dx * this.speed * dt < settings.map.border.bottom) {
            this.x += this.dx * this.speed * dt;
            this.y += this.dy * this.speed * dt;
        } else {
            this.y = settings.map.border.bottom;
            this.dx = 0;
            this.rotation = 0;
        }
    }
}

export default Player;