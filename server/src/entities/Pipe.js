import GameObject from "../core/GameObject";
import settings from "../configs/settings";

class Pipe extends GameObject {
    constructor({position, wholeSize, shift,...params}) {
        super({position, ...params});

        this.dx = 0;
        this.dy = 1;

        this.width = 80;
        this.height = (Math.abs(settings.map.border.top) + Math.abs(settings.map.border.bottom));
        this.distance = 1;
        this.position = position;

        if (position === 'top') {
            this.y = settings.map.border.top + 20 + shift - this.height / 2;
        }

        if (position === 'bottom') {
            this.y = settings.map.border.bottom - this.height + 20 + shift + wholeSize + this.height / 2;
        }
    }

    get clientData() {
        return {
            id: this.id,
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y,
            position: this.position
        }
    }

    update(dt) {
        // if (this.distance > 100) {
        //     this.dy = -this.x / 1000;
        // }
        //
        // if (this.distance < -100) {
        //     this.dy = this.x / 1000;
        // }
        //
        // if (this.x > 1000) {
        //     this.distance += this.dy;
        //
        //     this.y += this.dy;
        // }
    }
}

export default Pipe;