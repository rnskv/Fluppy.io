import Floor from "../entities/Floor";
import Manager from "../core/Manager";

class FloorsManager extends Manager {
    constructor({...params}) {
        super({...params});
        this.isEnvironment = true;
    }

    add(objectData) {
        const { stage } = this;
        objectData.id = Math.random();
        if (super.add(objectData)) {
            const floor = new Floor({
                stage,
                camera: this.managers.global.camera,
                resources: this.managers.global.stores.main.get('resources'),
                id: objectData.id,
                x: objectData.x,
                y: objectData.y
            });

            this.map[objectData.id] = floor;
            floor.addToStage();
        }
    }

    update(dt) {
        const settings = this.managers.global.stores.main.get('settings');

        if (settings) {
            if (!this.getLast().x) {
                this.add({
                    x: 0,
                    y: settings.map.border.bottom
                });
            }

            const gluingOffset = 100;

            if ((this.managers.global.camera.position.x + this.managers.global.camera.size.width) > this.getLast().x - gluingOffset) {
                this.add({
                    x: this.getLast().x + this.getLast().width - gluingOffset,
                    y: settings.map.border.bottom
                });
            }

        }

        this.clearActives();
        Object.values(this.map).forEach((floor, index) => {

            if (floor.x + floor.width > this.managers.global.camera.x
            ) {
                this.moveToActive(floor.id);
            }
        });

        this.list.forEach(object => {
           object.update(dt)
       })
    }
}

export default FloorsManager;