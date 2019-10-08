import { observable, action } from "mobx";

class MainStore {
  @observable isLoading = true;

  constructor() {
    setTimeout(this.loadStore.bind(this), 1500);
  }

  @action
  loadStore = () => {
    this.isLoading = false;
  };
}

export default new MainStore();
