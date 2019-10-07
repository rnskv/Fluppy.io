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
                return this.checkCircleRectangle(obj1, obj2)
            }
        }



        if (obj1.shape.type === 'RECT') {
            if (obj2.shape.type === 'CIRCLE') {
                return this.checkCircleRectangle(obj2, obj1)
            }

            if (obj2.shape.type === 'RECT') {
                return this.checkRectangleRectangle(obj1, obj2)
            }
        }
    }

    checkCircleCircle(circle1, circle2) {

    }

    checkRectangleRectangle(rectangle1, rectangle2) {
        let XColl = false;
        let YColl = false;

        if ((rectangle1.x + rectangle1.shape.size.x + rectangle1.shape.size.width >= rectangle2.x + rectangle2.shape.size.x) && (rectangle1.x + rectangle1.shape.size.x <= rectangle2.x + rectangle2.shape.size.x + rectangle1.shape.size.width)) XColl = true;
        if ((rectangle1.y + rectangle1.shape.size.y + rectangle1.shape.size.height >= rectangle2.y + rectangle2.shape.size.y) && (rectangle1.y + rectangle1.shape.size.y <= rectangle2.y + rectangle2.shape.size.y + rectangle1.shape.size.height)) YColl = true;

        return XColl && YColl;
    }

    checkCircleRectangle(circle, rectangle) {
        // Get from http://qaru.site/questions/696570/detecting-collision-of-rectangle-with-circle
        const distX = Math.abs(circle.x + circle.shape.size.x - rectangle.x + rectangle.shape.size.x - rectangle.shape.width / 2);
        const distY = Math.abs(circle.y + circle.shape.size.y - rectangle.y + rectangle.shape.size.y - rectangle.shape.height / 2);

        if (distX > (rectangle.shape.size.width / 2 + circle.shape.size.radius)) { return false; }
        if (distY > (rectangle.shape.size.height / 2 + circle.shape.size.radius)) { return false; }

        if (distX <= (rectangle.shape.size.width / 2)) { return true; }
        if (distY <= (rectangle.shape.size.height / 2)) { return true; }

        const dx = distX - rectangle.shape.size.width / 2;
        const dy = distY - rectangle.shape.size.height / 2;

        return ((dx * dx) + (dy * dy) <= (circle.shape.size.radius * circle.shape.size.radius));

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