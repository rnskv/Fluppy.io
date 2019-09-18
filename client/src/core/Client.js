export default class Client {
    constructor(root, params) {
        this.root = root;
        this.params = params;
        this.stages = {};
    }

    setStage(id, stage) {
        stage.width = this.params.width;
        stage.height = this.params.height;

        this.stages[id] = stage.getContext('2d');
        this.root.appendChild(stage)
    }

    getStage(id) {
        return this.stages[id];
    }

    removeStage(id) {
        this.stages[id] = null;
    }
}