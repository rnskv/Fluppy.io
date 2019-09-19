import * as PIXI from 'pixi.js'

export default class Client {
    constructor(root, params) {
        this.root = root;
        this.params = params;
        this.apps = {};
    }

    createApp(id) {
        const { width, height } = this.params;

        this.apps[id] = new PIXI.Application({
            width,
            height
        });

        const currentView = this.apps[id].view;

        this.root.appendChild(currentView);
    }

    getApp(id) {
        return this.apps[id];
    }

    removeStage(id) {
        delete this.apps[id];
    }
}