import { observable, action } from "mobx";

class UserStore {
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
    console.log('log out')
    this.accessToken = null;
    localStorage.removeItem('accessToken');
  };

  @action
  getUserData = () => {

  }
}

export default new UserStore();
