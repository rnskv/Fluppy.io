import ParalaxManager from "../core/ParalaxManager";

class ForestManager extends ParalaxManager {
    constructor({...params}) {
        super({...params});
        this.isEnvironment = true;
        this.gluingOffset = 10;
        this.paralaxFactors = {
            x: -0.35,
            y: -0.9
        };
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
            paralaxFactors: this.paralaxFactors,
            x: objectData.x,
            y: objectData.y
        }
    }
}

export default ForestManager;