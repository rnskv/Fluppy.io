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

            if ((this.managers.global.camera.position.x + this.managers.global.camera.size.width) > this.getLast().x) {
                this.add({
                    x: this.getLast().x + this.getLast().width,
                    y: settings.map.border.bottom
                });
            }
        }
        this.clearActives();

        Object.values(this.map).forEach(object => {
           this.moveToActive(object.id);
        });

        this.list.forEach(object => {
           object.update(dt)
       })
    }
}

export default FloorsManager;