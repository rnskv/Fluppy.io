class EventEmitter {
  constructor() {
    this.events = {};
    console.log("EventEmitter init");

    if (!window.EventEmitterInstanse) {
      window.EventEmitterInstanse = this;
    }

    return window.EventEmitterInstanse;
  }

  emit(eventName, data) {
    const event = this.events[eventName];
    console.log(eventName, data);

    if (!event) {
      throw new Error(`Event ${eventName} hasn't subscribers`);
    } else {
      event.forEach(fn => {
        fn.call(fn, data);
      });
    }
  }

  subscribe(eventName, callback) {
    console.log('EVENTS', this.events);
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }
}
export default new EventEmitter();
