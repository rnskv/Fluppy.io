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

        var XColl=false;
        var YColl=false;

        console.log('shape:', obj2.shape.size);

        if ((obj1.x + obj1.shape.size.width >= obj2.x) && (obj1.x <= obj2.x + obj2.shape.size.width)) XColl = true;
        if ((obj1.y + obj1.shape.size.height >= obj2.y) && (obj1.y <= obj2.y + obj2.shape.size.height)) YColl = true;

        if (XColl&YColl){return true;}

        return false;
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