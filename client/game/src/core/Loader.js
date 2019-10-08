class Loader {
    constructor(loader) {
        this.loader = loader;
        this.manifest = null;
    }

    addManifest(manifest) {
        this.manifest = manifest;
    }

    load(callback) {
        Object.keys(this.manifest).forEach(resourceId => {
            const resourseUrl = this.manifest[resourceId];
            this.loader.add(resourceId, resourseUrl)
        });

        this.loader.load(callback)
    }
}

export default Loader;