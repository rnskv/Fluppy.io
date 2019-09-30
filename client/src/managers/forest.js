import Manager from "../core/Manager";

class ForestManager extends Manager {
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

        const isFirstFloor = !this.getLast().x;

        const leftViewportPoint = this.controller.camera.position.x + this.controller.camera.size.width;
        const leftFloorPoint = this.getLast().x;

        const isNeedAddNewFloor = leftViewportPoint > leftFloorPoint;
        console.log(isNeedAddNewFloor)
        if (settings) {
            if (isFirstFloor) {
                this.add({
                    x: 0,
                    y: settings.map.border.top
            });
            }
            console.log(this.getLast())
            if (isNeedAddNewFloor) {
                this.add({
                    x: this.getLast().x + this.getLast().width - 1,
                    y: settings.map.border.top
                });
            }
        }

    }

    update(dt, updates) {
        this.addNewFloor();
        super.update(dt, updates)
    }
}

export default ForestManager;