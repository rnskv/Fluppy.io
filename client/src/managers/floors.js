import Manager from "../core/Manager";

class FloorsManager extends Manager {
    constructor({...params}) {
        super({...params});
        this.isEnvironment = true;
    }

    selector(objectData) {
        return {
            controller: this.controller,
            id: Math.random(),
            x: objectData.x,
            y: objectData.y
        }
    }

    update(dt) {
        const settings = this.controller.stores.main.get('settings');

        if (settings) {
            if (!this.getLast().x) {
                this.add({
                    x: 0,
                    y: settings.map.border.bottom
                });
            }

            const gluingOffset = 100;

            if ((this.controller.camera.position.x + this.controller.camera.size.width) > this.getLast().x - gluingOffset) {
                this.add({
                    x: this.getLast().x + this.getLast().width - gluingOffset,
                    y: settings.map.border.bottom
                });
            }

        }


        this.clearActives();
        Object.values(this.map).forEach((floor, index) => {

            if (floor.x + floor.width > this.controller.camera.x
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