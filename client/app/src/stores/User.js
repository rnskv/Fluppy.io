import { observable, action } from "mobx";

class MainStore {
  @observable acessToken = null;

  constructor() {
    const accessToken = localStorage.getItem('acessToken');
    if (accessToken) {
      this.login(accessToken)
    }
  }

  @action
  login = (acessToken) => {
    this.acessToken = acessToken;
    localStorage.setItem('acessToken', acessToken);
  };

  @action
  logout = () => {
    this.acessToken = null;
  };

  @action
  getUserData = () => {

  }
}

export default new MainStore();
