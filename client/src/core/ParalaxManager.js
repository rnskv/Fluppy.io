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

    addPart() {
        const settings = this.controller.stores.main.get('settings');
        const gluingOffset = this.gluingOffset;
        const isFirstPart = !this.getLast().x;
        const leftViewportPoint = this.controller.camera.position.x + this.controller.camera.size.width;
        const leftFloorPoint = this.getLast().x - gluingOffset * this.paralaxFactor;

        const isNeedAddNewFloor = leftViewportPoint > leftFloorPoint;

        if (settings) {
            if (isFirstPart) {
                this.add(this.getFirstPartPosition());
            }

            if (isNeedAddNewFloor) {
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