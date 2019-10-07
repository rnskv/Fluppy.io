class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor() {
        this.root = null;
        this.length = 0;
    }

    print() {
        let currentNode = this.root;
        let result = `${currentNode.value} -> `;
        while (currentNode.nextNode !== null) {
            currentNode = currentNode.nextNode;
            result += `${currentNode.value} -> `
        }
    }

    size() {
        return this.length;
    }

    findLast() {
        let currentNode = this.root;
        while (currentNode.nextNode !== null) {
            currentNode = currentNode.nextNode;
        }
        return currentNode;
    }

    indexOf(value) {
        let currentNode = this.root;
        let index = 0;
        while (currentNode) {
            index++;
            if (currentNode.value === value) {
                return index;
            }
            currentNode = currentNode.nextNode;
        }
        return -1;
    }

    get(index) {
        let currentNode = this.root;
        while (index--) {
            if (currentNode.nextNode) {
                currentNode = currentNode.nextNode;
            } else {
                return null
            }
        }
        return currentNode;
    }

    find(value) {
        let currentNode = this.root;
        while (currentNode) {
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.nextNode;
        }
        return null;
    }

    add(value) {
        if (this.size() === 0) {
            this.root = new Node(value);
        } else {
            this.findLast().nextNode = new Node(value);
        }

        return ++this.length;
    }

    remove(index) {
        this.get(index - 1).nextNode = this.get(index + 1);

        return --this.length;
    }

    replace(index) {
        /** **/
    }
}

export default LinkedList