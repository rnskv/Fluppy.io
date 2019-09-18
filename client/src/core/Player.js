export default class Player {
    constructor({ id, x, y }) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, 5, 5)
    }

    update(dt, updates) {
        if (!updates) return;
        Object.keys(updates).forEach(param => {
            this[param] = updates[param];
        });
    }
}