import GameObject from "../core/GameObject";
import settings from '../configs/settings';

class Player extends GameObject {
    constructor({...params}) {
        super({...params})

        this.speed = 1;

        this.dx = 0;
        this.dy = 10;

        this.width = 20;
        this.height = 20;

        this.pivot = { x: this.width / 2, y: this.height / 2 };
        this.gravity = 9.8;
        this.moveUpRotation = 25;

        this.isDie = false;
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
        this.dy = -10;
        this.rotation = -15;
        this.y -= 1;
    }

    onCollide(object) {
        if (this.isDie) return;
        this.dx = 0;
        this.rotation = 90;
        this.isDie = true;
        this.x = object.x - this.width;
        this.dy = -10;
    }

    update(dt) {
        this.methods.spawnPipe(this.x, 0);
        if (this.dy < 7) {
            this.dy += 1 * dt;
        }

        if (this.dx < 2.5 && !this.isDie) {
            this.dx += 1 * dt;
        }

        if (this.rotation < this.moveUpRotation) {
            this.rotation += 5 * dt;
        }

        if (this.y < settings.map.border.top) {
            this.dy = 10 * dt;
        }

        if (this.y + this.dy * this.speed * dt < settings.map.border.bottom) {
            this.x += this.dx * this.speed * dt;
            this.y += this.dy * this.speed * dt;
        } else {
            if (this.x > 500) {
                this.y = 0;
                this.x = 0;
                this.rotation = 0;
                this.isDie = false;
            } else {
                this.rotation = 0;
            }
        }
    }
}

export default Player;