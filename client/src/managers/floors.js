import Manager from "../core/Manager";

class FloorsManager extends Manager {
    constructor({...params}) {
        super({...params});
        this.isEnvironment = true;
    }

    selector(objectData) {
        return {
            controller: this.managers.global,
            id: Math.random(),
            x: objectData.x,
            y: objectData.y
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