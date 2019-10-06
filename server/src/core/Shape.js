import * as SHAPES from '../types/shapes';

class Shape {
    constructor({type, width, height, radius}) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.radius = radius;
    }

    get size() {
        switch (this.type) {
            case SHAPES.RECT: {
                return {
                    width: this.width,
                    height: this.height
                }
            }
            case SHAPES.CIRCLE: {
                return {
                    radius: this.radius
                }
            }
        }
    }
}

export default Shape;