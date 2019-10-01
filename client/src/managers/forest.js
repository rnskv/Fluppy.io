import ParalaxManager from "../core/ParalaxManager";

class ForestManager extends ParalaxManager {
    constructor({...params}) {
        super({...params});
        this.isEnvironment = true;
        this.gluingOffset = 10;
        this.paralaxFactor = 0.3;
    }

    getNewPartPosition() {
        const settings = this.controller.stores.main.get('settings');
        const lastPart = this.getLast();

        return {
            x: lastPart.x + lastPart.width - this.gluingOffset,
            y: settings.map.border.top
        }
    }

    getFirstPartPosition() {
        const settings = this.controller.stores.main.get('settings');

        return {
            x: 0,
            y: settings.map.border.top
        }
    }

    selector(objectData) {
        return {
            controller: this.controller,
            x: objectData.x,
            y: objectData.y
        }
    }
}

export default ForestManager;