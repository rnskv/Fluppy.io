import Manager from "./Manager";

class ParalaxManager extends Manager {
    constructor({...params}) {
        super(params);
        this.paralaxFactor = 1;
        this.gluingOffset = 0;
    }

    getActiveObjects(updates) {
        return Object.values(this.map).filter((floor) => floor.x + floor.width > this.controller.camera.x);
    }

    getNewPartPosition() {
        const settings = this.controller.stores.main.get('settings');

        return {
            x: this.getLast().x + this.getLast().width - this.gluingOffset,
            y: settings.map.border.bottom
        }
    }

    getFirstPartPosition() {
        const settings = this.controller.stores.main.get('settings');

        return {
            x: 0,
            y: settings.map.border.bottom
        }
    }

    get isNeedAddNewPart() {
        const camera = this.controller.camera;
        const gluingOffset = this.gluingOffset;


        const leftViewportPoint = camera.position.x + camera.size.width;
        const leftPartPoint = this.getLast().x - gluingOffset * this.paralaxFactor;

        return leftViewportPoint > leftPartPoint;
    }

    get isFirstPart() {
        const lastPart = this.getLast();
        return !lastPart.x;
    }

    addPart() {
        const settings = this.controller.stores.main.get('settings');
        if (!settings) return;

        if (this.isFirstPart) {
            this.add(this.getFirstPartPosition());
            return;
        }

        if (this.isNeedAddNewPart) {
            this.add(this.getNewPartPosition());
        }
    }

    update(dt, updates) {
        this.addPart();
        super.update(dt, updates)
    }
}

export default ParalaxManager;