class Interpolator {
    constructor() {

    }

    interpolateObject(from, to, ratio) {
        if (!to) {
            return from;
        }

        const interpolated = {};

        Object.keys(from).forEach(key => {
            switch (key) {
                case 'x':
                case 'y':
                case 'rotation':
                    if (Math.abs(from[key]) - Math.abs(to[key]) < 200) {
                        interpolated[key] = from[key] + (to[key] - from[key]) * ratio;
                    } else {
                        interpolated[key] = to[key];
                    }

                    break;
                default:
                    interpolated[key] = to[key];
                    break;
            }
        });

        return interpolated;
    }

    interpolateObjectsMap(fromMap, toMap, ratio) {
        const result = {};
        Object.keys(fromMap).forEach((key, index) => {
            const fromMapItem = fromMap[key];
            const toMapItem = toMap[key];

            result[key] = this.interpolateObject(fromMapItem, toMapItem, ratio)
        });


        return result;
    }

}

export default new Interpolator();