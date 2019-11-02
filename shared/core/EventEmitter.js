let instance = null;
class EventEmitter {
  constructor() {
    this.events = {};
    console.log("EventEmitter init");
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  emit(eventName, data) {
    const event = this.events[eventName];
    if (!event) {
      // throw new Error(`Event ${eventName} hasn't subscribers`);
    } else {
      event.forEach(fn => {
        fn.call(fn, data);
      });
    }
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  reset() {
    this.events = {};
  }
}
export default new EventEmitter();
