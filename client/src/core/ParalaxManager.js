import Manager from "./Manager";

class ParalaxManager extends Manager {
    constructor({...params}) {
        super(params);
        this.paralaxFactor = 1;
        this.gluingOffset = 0;
    }

    getActiveObjects(updates) {
        return this.objects.values.filter((floor) => floor.x + floor.width > this.controller.camera.x);
    }

    getNewPartPosition() {
        const settings = this.controller.stores.main.get('settings');

        return {
            x: this.objects.last.x + this.objects.last.width - this.gluingOffset,
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
        return !this.objects.last
    }

    addPart() {
        const settings = this.controller.stores.main.get('settings');
        const { controller, gluingOffset, paralaxFactor, isFirstPart} = this;

        const leftViewportPoint = controller.camera.position.x + controller.camera.size.width;
        const leftPartPoint = this.objects.last ? this.objects.last.x : 0 - gluingOffset * paralaxFactor;

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