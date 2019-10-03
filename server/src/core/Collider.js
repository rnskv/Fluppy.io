class Collider {
    constructor() {
        this.managers = {};
    }

    addCollisionManager(managerName, manager) {
        this.managers[managerName] = manager;
    }

    checkCollistion(obj1, obj2) {
        var XColl=false;
        var YColl=false;

        if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) XColl = true;
        if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) YColl = true;

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