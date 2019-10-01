import ParalaxManager from "../core/ParalaxManager";

class SilhouetteManager extends ParalaxManager {
    constructor({...params}) {
        super({...params});
        this.isEnvironment = true;
        this.gluingOffset = 10;
        this.paralaxFactors = {
            x: -0.8,
            y: -0.95
        };
    }

    getNewPartPosition() {
        const settings = this.controller.stores.main.get('settings');
        const lastPart = this.getLast();

        return {
            x: lastPart.x + lastPart.width - this.gluingOffset,
            y: settings.map.border.bottom - 200
        }
    }

    getFirstPartPosition() {
        const settings = this.controller.stores.main.get('settings');

        return {
            x: 0,
            y: settings.map.border.bottom - 200
        }
    }

    selector(objectData) {
        return {
            controller: this.controller,
            paralaxFactors: this.paralaxFactors,
            x: objectData.x,
            y: objectData.y
        }
    }
}

export default SilhouetteManager;