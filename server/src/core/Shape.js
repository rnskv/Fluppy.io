import * as SHAPES from '../types/shapes';

class Shape {
    constructor({type, width, height, radius, anchor, origin}) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.origin = origin;
        this.anchor = anchor || {x: 0.5, y: 0.5}
    }

    get size() {
        switch (this.type) {
            case SHAPES.RECT: {
                return {
                    width: this.width,
                    height: this.height,
                    x: (this.anchor.x * this.origin.width) - (this.width * this.anchor.x),
                    y: (this.anchor.y * this.origin.height) - (this.height * this.anchor.y)
                }
            }
            case SHAPES.CIRCLE: {
                return {
                    radius: this.radius,
                    x: (this.anchor.x * this.origin.radius * 2) - (this.anchor.x * this.radius * 2),
                    y: (this.anchor.x * this.origin.radius * 2) - (this.anchor.x * this.radius * 2),
                }
            }
        }
    }
}

export default Shape;