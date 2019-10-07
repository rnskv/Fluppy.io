import ParalaxManager from "../core/ParalaxManager";

class LeavesManager extends ParalaxManager {
    constructor({...params}) {
        super({...params});
        this.isEnvironment = true;
        this.gluingOffset = 10;
        this.paralaxFactors = {
            x: -1,
            y: -1
        };
    }

    getNewPartPosition() {
        const settings = this.controller.stores.main.get('settings');
        const lastPart = this.objects.last;

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

export default LeavesManager;