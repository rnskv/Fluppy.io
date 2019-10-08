class ObjectsPool {
  constructor({ type = "DEFAULT" }) {
    this.type = type;
    this.lastGeneratedId = 0;
    this.isCached = false;
    this.chached = {
      values: [],
      keys: [],
      entries: []
    };

    this.map = new Map();
  }

  get uniqueId() {
    return ++this.lastGeneratedId;
  }

  get entries() {
    return this.isCached
      ? Array.from(this.chached.entries)
      : Array.from(this.map.entries());
  }

  get keys() {
    return this.isCached
      ? Array.from(this.chached.keys)
      : Array.from(this.map.keys());
  }

  get values() {
    return this.isCached
      ? Array.from(this.chached.values)
      : Array.from(this.map.values());
  }

  get size() {
    return this.map.size;
  }

  get last() {
    return this.values[this.size - 1] || null;
  }

  add(id, value) {
    const identificator = id === null ? this.uniqueId : id;
    if (!this.isExist(identificator)) {
      this.map.set(identificator, value);
      return true;
    }
    return false;
  }

  remove(id) {
    if (this.isExist(id)) {
      this.map.delete(id);
      return true;
    }

    return false;
  }

  getById(id) {
    return this.map.get(id);
  }

  isExist(id) {
    return !!this.map.get(id);
  }

  cache() {
    this.isCached = true;
    this.chached = {
      values: this.map.values(),
      keys: this.map.keys(),
      entries: this.map.entries()
    };
  }

  unCache() {
    this.isCached = false;
    this.chached = {
      values: [],
      keys: [],
      entries: []
    };
  }

  reset() {
    this.map = new Map();
  }
}

export default ObjectsPool;
