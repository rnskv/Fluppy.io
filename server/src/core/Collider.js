class Collider {
    constructor() {
        this.managers = {};
    }

    addCollisionManager(managerName, manager) {
        this.managers[managerName] = manager;
    }

    checkCollistion(obj1, obj2) {
        if (!obj1.hasCollision || !obj1.shape) {
            throw new Error(`Object with id - ${obj1.id} is not collider`)
        }
        if (!obj2.hasCollision || !obj1.shape) {
            throw new Error(`Object with id - ${obj2.id} is not collider`)
        }

        if (obj1.shape.type === 'CIRCLE') {
            if (obj2.shape.type === 'RECT') {
                console.log('check col circle with rect')
                return this.checkCircleRectangle(obj1, obj2)
            }
        }

        if (obj1.shape.type === 'RECT') {
            if (obj2.shape.type === 'CIRCLE') {
                return this.checkCircleRectangle(obj2, obj1)
            }
        }

        var XColl=false;
        var YColl=false;

        console.log('shape:', obj2.shape.size);

        if ((obj1.x + obj1.shape.size.width >= obj2.x) && (obj1.x <= obj2.x + obj2.shape.size.width)) XColl = true;
        if ((obj1.y + obj1.shape.size.height >= obj2.y) && (obj1.y <= obj2.y + obj2.shape.size.height)) YColl = true;

        if (XColl&YColl){return true;}

        return false;
    }

    checkCircleCircle(circle1, circle2) {

    }

    checkRectangleRectangle(rectangle1, rectangle2) {

    }

    checkCircleRectangle(circle, rectangle) {
        // Get from http://qaru.site/questions/696570/detecting-collision-of-rectangle-with-circle
        const distX = Math.abs(circle.x - rectangle.x - rectangle.width / 2);
        const distY = Math.abs(circle.y - rectangle.y - rectangle.height / 2);

        if (distX > (rectangle.width / 2 + circle.radius)) { return false; }
        if (distY > (rectangle.height / 2 + circle.radius)) { return false; }

        if (distX <= (rectangle.width / 2)) { return true; }
        if (distY <= (rectangle.height / 2)) { return true; }

        const dx = distX - rectangle.width / 2;
        const dy = distY - rectangle.height / 2;

        return ((dx * dx) + (dy * dy) <= (circle.radius * circle.radius));

    }

    checkCollisionsBetween(manager1, manager2) {
        //Проверить потом переписать
        const firstList = manager1.list;
        const secondList = manager2.list;

        for (let object of firstList) {
            for (let enemyObject of secondList) {
                if (this.checkCollistion(object, enemyObject)) {
                    object.onCollide(enemyObject);
                    enemyObject.onCollide(object)
                }
            }
        }

    }
}

export default Collider;