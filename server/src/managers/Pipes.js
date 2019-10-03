import Manager from "../core/Manager";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

class PipesManager extends Manager {
    constructor({...params}) {
        super({...params});

        this.preset = {
            'spawnertop': {x: 500, y: -99999},
            'spawnerbottom': {x: 500, y: 99999},
        };

        this.gapDistance = 400;
    }

    init(controller) {
        super.init(controller);

        for (let [id, data] of Object.entries(this.preset)) {
            this.addPipe(id, data)
        }

        controller.collider.addCollisionManager('pipes', this);
    }

    addPipe(id, objectParams) {
        const pipe = new this.entity(
            {
                id,
                x: objectParams.x,
                y: objectParams.y,
                width: objectParams.width,
                height: objectParams.height,
                position: objectParams.position,
                shift: objectParams.shift,
                wholeSize: objectParams.wholeSize
            }
        );

        const isAdded = this.addObject(pipe);
    }

    spawnPipes() {
        const lastPosition = this.getLast() ? this.getLast().x : 0;

        const wholeSize = getRandomInt(150, 300);
        const shift = getRandomInt(0, 200);

        this.addPipe(this.getUniqueId(), {
            x: lastPosition + this.gapDistance,
            position: 'top',
            shift: shift,
            wholeSize
        });

        this.addPipe(this.getUniqueId(), {
            x: lastPosition + this.gapDistance,
            position: 'bottom',
            shift: shift,
            wholeSize
        });
    }

    connectManager(name, manager) {
        super.connectManager(name, manager);
    }

    removePipe(id) {
        const isRemoved = this.removeObject(id);
    }

    update(dt) {
        super.update(dt);
    }
}

export default PipesManager;