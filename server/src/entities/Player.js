import GameObject from "../core/GameObject";
import settings from '../configs/settings';

class Player extends GameObject {
    constructor({...params}) {
        super({...params})

        this.speed = 1;

        this.dx = 1;
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
        this.rotation = -15;
    }

    update(dt) {

        if (this.dy < 9.8) {
            this.dy += 1;
        }

        if (this.rotation < 25) {
            this.rotation += 5;
        }

        if (this.y < settings.map.border - this.height) {
            this.dy = 10;
        }

        if (this.y < settings.map.border.bottom) {
            this.x += this.dx * this.speed * dt;
            this.y += this.dy * this.speed * dt;
        } else {
            this.rotation = 0;
            this.y = 0;
            this.x = 0;
        }
    }
}

export default Player;