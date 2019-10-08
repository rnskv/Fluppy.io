class EventEmitter {
    constructor() {
        this.events = {};
        console.log('EventEmitter init')
    }

    emit(eventName, data) {
      console.log(this.events)
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
        console.log('subscribe to', eventName);
        if(!this.events[eventName] ) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback)
        console.log(this.events)
    }
}
export default new EventEmitter();
