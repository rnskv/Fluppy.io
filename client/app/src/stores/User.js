import { observable, action } from "mobx";
import api from 'app/src/modules/api';

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

    api.setToken(this.accessToken);
    api.execute({name: 'users.get'})
      .then((data) => { console.log('Все ок', this.accessToken)})
      .catch((err) => { console.log('Все не ок', err)});
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
