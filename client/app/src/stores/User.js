import { observable, action } from "mobx";

class MainStore {
  @observable accessToken = null;

  constructor() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.login(accessToken)
    }
  }

  @action
  login = (accessToken) => {
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  };

  @action
  logout = () => {
    this.acessToken = null;
    localStorage.removeItem('accessToken');
  };

  @action
  getUserData = () => {

  }
}

export default new MainStore();
