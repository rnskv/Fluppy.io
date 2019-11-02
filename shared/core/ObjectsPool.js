class ObjectsPool {
  constructor({ type = "DEFAULT", initValue = {} }) {
    this.type = type;
    this.lastGeneratedId = 0;
    this.isCached = false;
    this.chached = {
      values: [],
      keys: [],
      entries: []
    };

    this.map = new Map();

    this.init(initValue)
  }

  init(initValue) {
    for (const [key, value] of Object.entries(initValue)) {
      this.add(key, value);
    }
  }

  get uniqueId() {
    return ++this.lastGeneratedId;
  }

  get entries() {
    return this.isCached
      ? this.chached.entries
      : Array.from(this.map.entries());
  }

  get keys() {
    return this.isCached
      ? this.chached.keys
      : Array.from(this.map.keys());
  }

  get values() {
    return this.isCached
      ? this.chached.values
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
      this.unCache();
      this.map.set(identificator, value);
      this.cache();
      return true;
    }
    return false;
  }

  remove(id) {
    if (this.isExist(id)) {
      this.unCache();
      this.map.delete(id);
      this.cache();
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
      //Задел на будущее - добавить кэширование
    this.chached = {
        values: Array.from(this.map.values()),
        keys: Array.from(this.map.keys()),
        entries: Array.from(this.map.entries())
    };
    this.isCached = true;
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
