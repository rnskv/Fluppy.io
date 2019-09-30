import Manager from "../core/Manager";

class FloorsManager extends Manager {
    constructor({...params}) {
        super({...params});
        this.isEnvironment = true;

    }

    selector(objectData) {
        return {
            controller: this.controller,
            x: objectData.x,
            y: objectData.y
        }
    }

    getActiveObjects(updates) {
        return Object.values(this.map).filter((floor) => floor.x + floor.width > this.controller.camera.x);
    }

    addNewFloor() {
        const settings = this.controller.stores.main.get('settings');
        const gluingOffset = 100;

        const isFirstFloor = !this.getLast().x;

        const leftViewportPoint = this.controller.camera.position.x + this.controller.camera.size.width;
        const leftFloorPoint = this.getLast().x - gluingOffset;

        const isNeedAddNewFloor = leftViewportPoint > leftFloorPoint;

        if (settings) {
            if (isFirstFloor) {
                this.add({
                    x: 0,
                    y: settings.map.border.bottom
                });
            }

            if (isNeedAddNewFloor) {
                this.add({
                    x: this.getLast().x + this.getLast().width - gluingOffset,
                    y: settings.map.border.bottom
                });
            }

        }

    }

    update(dt, updates) {
        this.addNewFloor();
        super.update(dt, updates)
    }
}

export default FloorsManager;