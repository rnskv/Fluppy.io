class Store {
  constructor(initState = {}) {
    this.state = initState;
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;
  }

  remove(key) {
    delete this.state[key];
  }

  get data() {
    return this.state;
  }
}

export default Store;
