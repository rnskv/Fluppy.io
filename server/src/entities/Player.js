import GameObject from "../core/GameObject";
import settings from '../configs/settings';

class Player extends GameObject {
    constructor({...params}) {
        super({...params})

        this.speed = 1;

        this.dx = 0;
        this.dy = 10;

        this.width = 30;
        this.height = 30;

        this.pivot = { x: this.width / 2, y: this.height / 2 };
        this.gravity = 9.8;
        this.moveUpRotation = 35;

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
        this.dy = -7;
        this.rotation = -25;
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
            this.dy += 1 * dt;
        }

        if (this.dx < 1.5 && !this.isDie) {
            this.dx += 0.5 * dt;
        }

        if (this.rotation < this.moveUpRotation) {
            this.rotation += 3.5 * dt;
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