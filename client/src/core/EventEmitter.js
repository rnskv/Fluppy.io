class EventEmitter {
    constructor() {
        this.events = {};
    }

    emit(eventName, data) {
        const event = this.events[eventName];
        if (!event) {
            throw new Error(`Event ${eventName} hasn't subscribers`);
        } else {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    }

    subscribe(eventName, callback) {
        if( !this.events[eventName] ) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback)
    }
}

export default new EventEmitter();