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

    get isFirstPart() {
        return !this.getLast().x
    }

    addPart() {
        const settings = this.controller.stores.main.get('settings');
        const { controller, gluingOffset, paralaxFactor, isFirstPart} = this;

        const leftViewportPoint = controller.camera.position.x + controller.camera.size.width;
        const leftPartPoint = this.getLast().x - gluingOffset * paralaxFactor;

        const isNeedAddNewPart = leftViewportPoint > leftPartPoint;

        if (settings) {
            if (isFirstPart) {
                this.add(this.getFirstPartPosition());
            }

            if (isNeedAddNewPart) {
                this.add(this.getNewPartPosition());
            }
        }

    }

    update(dt, updates) {
        this.addPart();
        super.update(dt, updates)
    }
}

export default ParalaxManager;